export function getGoogleSymbol(    symbol: string,    exchange: string): string {

    const cleanSymbol = symbol.trim().toUpperCase();
    const cleanExchange = exchange.trim().toUpperCase();

    if (cleanExchange === "NSE") {
        return `${cleanSymbol}:NSE`;
    }

    if (cleanExchange === "BSE") {
        return `${cleanSymbol}:BOM`;
    }

    return `${cleanSymbol}:${cleanExchange}`;
}