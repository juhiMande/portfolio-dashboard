export interface Stock {
    particulars: string;

    purchasePrice: number;
    quantity: number;

    investment: number;
    portfolioPercentage: number;

    exchangeCode: string;
    exchange: "NSE" | "BSE" | null;

    cmp: number | null;

    presentValue: number | null;
    gainLoss: number | null;

    peRatio: number | null;
    latestEarnings: number | null;

    sector: string;

    marketDataStatus:
    | "AVAILABLE"
    | "PARTIAL"
    | "UNAVAILABLE";
}

export interface PortfolioSummary {
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
    totalStocks: number;
    stocksWithMarketData: number;
}

export interface SectorSummary {
    sector: string;
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
    stockCount: number;
}

export interface PortfolioResponse {
    stocks: Stock[];
    summary: PortfolioSummary;
    sectors: SectorSummary[];
    lastUpdated: string;
}