import { Request, Response } from "express";
import { getPortfolioDashboard } from "../services/portfolio.service";

export const getPortfolio = async (
    req: Request,
    res: Response
) => {
    try {
        const portfolio =
            await getPortfolioDashboard();

        res.status(200).json(portfolio);
    } catch (error) {
        console.error("PORTFOLIO API ERROR:", error);

        const message =
            error instanceof Error
                ? error.message
                : String(error);

        res.status(500).json({
            message: "Failed to load portfolio data",
            error: message,
        });
    }
};