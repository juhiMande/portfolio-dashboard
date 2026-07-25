import { readPortFolioExcel } from "./excel.service";
import { Stock } from "../types/portfolio.types";

import { getCurrentPrice } from "./market.service";
import { getFundamentals } from "./google-finance.service";

import { getYahooSymbol } from "../utils/market-symbol.util";
import { getGoogleSymbol } from "../utils/google-symbol.util";

import { calculatePortfolioSummary, calculateSectorSummaries, } from "./portfolio-summary.service";

import { PortfolioResponse } from "../types/sector.types";

import pLimit from "p-limit";

const toNullableNumber = (value: unknown): number | null => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    if (typeof value == "number") {
        return Number.isFinite(value) ? value : null;
    }

    const parsedValue = Number(value);

    return Number.isFinite(parsedValue) ? parsedValue : null;
}

const toNumber = (value: unknown): number => {
    const number = toNullableNumber(value);
    return number ?? 0;
}

const toExchangeCode = (value: unknown): string => {
    if (value === null || value === undefined) {
        return "";
    }
    return String(value).trim();
}

const getExchange = (value: unknown): "NSE" | "BSE" | null => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    if (typeof value === "number") {
        return "BSE";
    }

    const code = String(value).trim();

    if (!code) {
        return null;
    }

    if (/^\d+$/.test(code)) {
        return "BSE";
    }

    return "NSE";
}

export const getPortfolioStocks = (): Stock[] => {

    const rows = readPortFolioExcel();

    const stocks: Stock[] = [];

    let currentSector = "";

    for (const row of rows.slice(2)) {
        if (!Array.isArray(row)) {
            continue;
        }

        const serialNumber = row[0];
        const particulars = row[1];

        

        if (serialNumber === null && typeof particulars === "string" && particulars.trim() !== "") {
            currentSector = particulars.trim();
            continue;
        }

        if (typeof serialNumber !== "number" || serialNumber < 1) {
            continue;
        }

        if (typeof particulars !== "string" || particulars.trim() === "") {
            continue;
        }

        const purchasePrice = toNumber(row[2]);
        const quantity = toNumber(row[3]);

        const investment = purchasePrice * quantity;

        const cmp = null;

        const presentValue = null;

        const gainLoss = null;

        const stock: Stock = {
            particulars: particulars.trim(),

            purchasePrice,
            quantity,

            investment,
            portfolioPercentage: toNumber(row[5]),

            exchangeCode: toExchangeCode(row[6]),
            exchange: getExchange(row[6]),

            cmp,

            presentValue,
            gainLoss,

            peRatio: null,
            latestEarnings: null,

            sector: currentSector,
            marketDataStatus: "UNAVAILABLE",
        };

        stocks.push(stock);
    }

    // Portfolio-level calculation

    const totalInvestment = stocks.reduce((total, stock) => total + stock.investment, 0);

    // Calculate percentage after total is known

    for (const stock of stocks) {
        stock.portfolioPercentage = totalInvestment > 0 ? (stock.investment / totalInvestment) * 100 : 0;
    }


    return stocks;
};

export const getPortfolioWithMarketData = async (): Promise<Stock[]> => {

    const stocks = getPortfolioStocks();

    const marketDataLimit = pLimit(5);

    const stocksWithMarketData = await Promise.all(
        stocks.map(async (stock) =>
            marketDataLimit(async () => {

                // Cannot fetch market data without symbol/exchange
                if (!stock.exchange || !stock.exchangeCode) {
                    return {
                        ...stock,
                        cmp: null,
                        presentValue: null,
                        gainLoss: null,
                        peRatio: null,
                        latestEarnings: null,
                        marketDataStatus: "UNAVAILABLE" as const,
                    };
                }

                try {
                    const yahooSymbol = getYahooSymbol(
                        stock.exchangeCode,
                        stock.exchange
                    );

                    const googleSymbol = getGoogleSymbol(
                        stock.exchangeCode,
                        stock.exchange
                    );

                    // Yahoo and Google are independent,
                    // so fetch both concurrently.
                    const [cmp, fundamentals] = await Promise.all([
                        getCurrentPrice(yahooSymbol),
                        getFundamentals(googleSymbol),
                    ]);

                    console.log("MARKET RESULT:", {
                        stock: stock.particulars,
                        yahooSymbol,
                        cmp,
                        peRatio: fundamentals.peRatio,
                        latestEarnings: fundamentals.latestEarnings,
                    });

                    const presentValue = cmp !== null
                        ? cmp * stock.quantity
                        : null;

                    const gainLoss = presentValue !== null
                        ? presentValue - stock.investment
                        : null;

                    let marketDataStatus: "AVAILABLE" | "PARTIAL" | "UNAVAILABLE";

                    if (cmp !== null && fundamentals.peRatio !== null && fundamentals.latestEarnings !== null) {
                        marketDataStatus = "AVAILABLE";
                    } else if (cmp !== null || fundamentals.peRatio !== null || fundamentals.latestEarnings !== null) {
                        marketDataStatus = "PARTIAL";
                    } else {
                        marketDataStatus = "UNAVAILABLE";
                    }

                    return {
                        ...stock,

                        cmp,
                        presentValue,
                        gainLoss,

                        peRatio: fundamentals.peRatio,
                        latestEarnings: fundamentals.latestEarnings,

                        marketDataStatus,
                    };

                } catch (error) {
                    console.error(`Market data processing failed for ${stock.particulars}:`, error);

                    return {
                        ...stock,

                        cmp: null,
                        presentValue: null,
                        gainLoss: null,

                        peRatio: null,
                        latestEarnings: null,

                        marketDataStatus: "UNAVAILABLE" as const,
                    };
                }
            })
        )
    );

    return stocksWithMarketData;
};

export const getPortfolioDashboard = async (): Promise<PortfolioResponse> => {

    const stocks = await getPortfolioWithMarketData();

    const summary = calculatePortfolioSummary(stocks);

    const sectors = calculateSectorSummaries(stocks);

    return {
        stocks,
        summary,
        sectors,
        lastUpdated: new Date().toISOString(),
    };
};