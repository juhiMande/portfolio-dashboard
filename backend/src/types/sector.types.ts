import { Stock } from "./portfolio.types";

export interface SectorSummary {
    sector: string;
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
    stockCount: number;
}

export interface PortfolioSummary {
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
    totalStocks: number;
    stocksWithMarketData: number;
}

export interface PortfolioResponse {
    stocks: Stock[];
    summary: PortfolioSummary;
    sectors: SectorSummary[];
    lastUpdated: string;
}