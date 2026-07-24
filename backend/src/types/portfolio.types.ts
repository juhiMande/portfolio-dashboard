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

    marketDataStatus: "AVAILABLE" | "PARTIAL" | "UNAVAILABLE";
}