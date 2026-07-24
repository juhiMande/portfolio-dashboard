import * as XLSX from "xlsx";
import path from "path";

export const readPortFolioExcel = () => {
    // Excel File Location
    const filePath = path.join(
        process.cwd(),
        "data",
        'A9047AE6.xlsx'
    );

    // Read Excel WorkBook
    const workbook = XLSX.readFile(filePath);

    // Get First Sheet Name
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
        throw new Error("No WorkSheet Found in Excel File");
    }

    // Get First WorkSheet
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        throw new Error(`Worksheet "${sheetName}" could not be read.`);
    }


    // Convert Excel rows to JSON
    const rows = XLSX.utils.sheet_to_json<unknown[]>(worksheet, {
        header: 1,
        defval: null,
        raw: true,
    });

    return rows;
}