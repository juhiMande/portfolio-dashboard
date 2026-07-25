export function parseFinancialNumber(value: string | undefined): number | null {

    if (!value) {
        return null;
    }

    const cleaned = value
        .replace(/,/g, "")
        .replace(/[₹$%]/g, "")
        .trim();

    const parsed = Number(cleaned);

    return Number.isFinite(parsed) ? parsed : null;
}