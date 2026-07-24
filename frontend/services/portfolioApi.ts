import { PortfolioResponse } from "@/types/portfolio";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPortfolio(): Promise<PortfolioResponse> {

    console.log("NEXT_PUBLIC_API_URL:", API_BASE_URL);

    const url = `${API_BASE_URL}/api/portfolio`;

    console.log("Fetching portfolio from:", url);

    const response = await fetch(url, {
        cache: "no-store",
    });

    console.log("Portfolio API status:", response.status);
    console.log(
        "Portfolio content-type:",
        response.headers.get("content-type")
    );

    if (!response.ok) {
        throw new Error(
            `Failed to load portfolio: ${response.status}`
        );
    }

    const data: PortfolioResponse = await response.json();

    return data;
}