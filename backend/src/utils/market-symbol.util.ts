export function getYahooSymbol(symbol: string, exchange: string): string {
    const cleanSymbol = symbol.trim().toUpperCase();
    const cleanExchange = exchange.trim().toUpperCase();

    if (cleanExchange === "NSE") {
        return `${cleanSymbol}.NS`;
    }

    if (cleanExchange === "BSE") {
        return `${cleanSymbol}.BO`;
    }

    return cleanSymbol;
}