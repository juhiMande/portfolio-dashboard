import { PortfolioResponse } from "@/types/portfolio";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000";

export async function getPortfolio():
    Promise<PortfolioResponse> {

    const response = await fetch(
        `${API_BASE_URL}/api/portfolio`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to load portfolio: ${response.status}`
        );
    }

    const data: PortfolioResponse =
        await response.json();

    return data;
}