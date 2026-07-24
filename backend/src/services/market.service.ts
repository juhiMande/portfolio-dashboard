    import YahooFinance from "yahoo-finance2";

    const yahooFinance = new YahooFinance({
        suppressNotices: ["yahooSurvey"],
    });

    interface PriceCacheEntry {
        price: number;
        timestamp: number;
    }

    const priceCache = new Map<string, PriceCacheEntry>();

    const CACHE_TTL = 10 * 1000;

    export async function getCurrentPrice(
        symbol: string
    ): Promise<number | null> {

        const cachedEntry = priceCache.get(symbol);

        if (cachedEntry) {
            const cacheAge = Date.now() - cachedEntry.timestamp;

            if (cacheAge < CACHE_TTL) {
                console.log(`Cache HIT: ${symbol}`);
                return cachedEntry.price;
            }

            priceCache.delete(symbol);
        }

        console.log(`Cache MISS: ${symbol}`);

        try {
            const quote = await yahooFinance.quote(symbol);

            if (!quote) {
                console.warn(`Yahoo quote not found for ${symbol}`);
                return null;
            }

            const price = quote.regularMarketPrice;

            if (typeof price !== "number") {
                console.warn(`CMP not available for ${symbol}`);
                return null;
            }

            priceCache.set(symbol, {
                price,
                timestamp: Date.now(),
            });

            return price;

        } catch (error) {
            console.error(`Yahoo Finance error for ${symbol}:`, error);
            return null;
        }
    }