import { Stock } from "../types/portfolio.types";
import { PortfolioSummary, SectorSummary, } from "../types/sector.types";

export const calculatePortfolioSummary = (stocks: Stock[]): PortfolioSummary => {

    let totalInvestment = 0;
    let totalPresentValue = 0;
    let totalGainLoss = 0;
    let stocksWithMarketData = 0;

    for (const stock of stocks) {

        totalInvestment += stock.investment;

        if (stock.presentValue !== null) {
            totalPresentValue += stock.presentValue;
        }

        if (stock.gainLoss !== null) {
            totalGainLoss += stock.gainLoss;
        }

        if (stock.cmp !== null) {
            stocksWithMarketData++;
        }
    }

    return {
        totalInvestment,
        totalPresentValue,
        totalGainLoss,

        totalStocks: stocks.length,
        stocksWithMarketData,
    };
};


export const calculateSectorSummaries = (stocks: Stock[]): SectorSummary[] => {

    const sectorMap = new Map<string, SectorSummary>();

    for (const stock of stocks) {

        const sector = stock.sector?.trim() || "Uncategorized";

        const existingSector = sectorMap.get(sector);

        if (existingSector) {

            existingSector.totalInvestment += stock.investment;

            if (stock.presentValue !== null) {
                existingSector.totalPresentValue += stock.presentValue;
            }

            if (stock.gainLoss !== null) {
                existingSector.totalGainLoss += stock.gainLoss;
            }

            existingSector.stockCount++;

        } else {

            sectorMap.set(sector, {
                sector,

                totalInvestment: stock.investment,

                totalPresentValue: stock.presentValue ?? 0,

                totalGainLoss: stock.gainLoss ?? 0,

                stockCount: 1,
            });
        }
    }

    return Array.from(sectorMap.values());
};