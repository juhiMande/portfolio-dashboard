import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio.routes";
import { getCurrentPrice } from "./services/market.service";
import { getYahooSymbol } from "./utils/market-symbol.util";
import { getFundamentals } from "./services/google-finance.service";
import { getGoogleSymbol } from "./utils/google-symbol.util";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
    });
});

app.use("/api/portfolio", portfolioRoutes);

app.get("/api/test-market", async (req, res) => {
    const yahooSymbol =
        getYahooSymbol("HDFCBANK", "NSE");

    const cmp =
        await getCurrentPrice(yahooSymbol);

    res.json({
        stock: "HDFC Bank",
        exchange: "NSE",
        symbol: "HDFCBANK",
        yahooSymbol,
        cmp,
    });
});

app.get("/api/test-google", async (req, res) => {
    const googleSymbol =
        getGoogleSymbol("HDFCBANK", "NSE");

    const fundamentals =
        await getFundamentals(googleSymbol);

    res.json({
        stock: "HDFC Bank",
        symbol: "HDFCBANK",
        exchange: "NSE",
        googleSymbol,
        ...fundamentals,
    });
});

export default app;