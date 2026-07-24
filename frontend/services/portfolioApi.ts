import { PortfolioResponse } from "@/types/portfolio";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getPortfolio() {
  console.log("API URL:", API_URL);

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const url = `${API_URL}/api/portfolio`;

  console.log("Fetching portfolio from:", url);

  const response = await fetch(url, {
    cache: "no-store",
  });

  console.log("Portfolio API status:", response.status);

  if (!response.ok) {
    const body = await response.text();
    console.error("Portfolio API error:", response.status, body);

    throw new Error(
      `Portfolio API failed: ${response.status} ${body}`
    );
  }

  return response.json();
}