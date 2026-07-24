import axios from "axios";
import * as cheerio from "cheerio";
import { StockFundamentals } from "../types/market.types";

interface FundamentalsCacheEntry {
    data: StockFundamentals;
    timestamp: number;
}

const fundamentalsCache =
    new Map<string, FundamentalsCacheEntry>();

const FUNDAMENTALS_CACHE_TTL =
    60 * 60 * 1000;

export async function getFundamentals(
    googleSymbol: string
): Promise<StockFundamentals> {

    const cachedEntry =
        fundamentalsCache.get(googleSymbol);

    if (cachedEntry) {

        const cacheAge =
            Date.now() - cachedEntry.timestamp;

        if (cacheAge < FUNDAMENTALS_CACHE_TTL) {

            console.log(
                `Google Cache HIT: ${googleSymbol}`
            );

            return cachedEntry.data;
        }

        fundamentalsCache.delete(googleSymbol);
    }

    console.log(
        `Google Cache MISS: ${googleSymbol}`
    );

    try {

        const url = `https://www.google.com/finance/quote/${encodeURIComponent(googleSymbol)}?hl=en`;

        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            },
            timeout: 10000,
        });

        const $ = cheerio.load(response.data);

        const bodyText = $("body").text();

        console.log(
            "Has P/E ratio:",
            bodyText.includes("P/E ratio")
        );

        // Parsing comes next.
        console.log(
            `Google Finance page loaded: ${googleSymbol}`
        );

        return {
            peRatio: null,
            latestEarnings: null,
        };

    } catch (error) {

        console.error(
            `Google Finance error for ${googleSymbol}:`,
            error
        );

        return {
             peRatio: null,
            latestEarnings: null,
        };
    }
}