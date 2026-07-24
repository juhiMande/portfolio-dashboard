import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";

export const readPortFolioExcel = () => {
    // const filePath = path.join(
    //     process.cwd(),
    //     "data",
    //     "A9047AE6.xlsx"
    // );

    const filePath = path.join(
        process.cwd(),
        "backend",
        "data",
        "A9047AE6.xlsx"
    );

    console.log("process.cwd():", process.cwd());
    console.log("Excel file path:", filePath);
    console.log("Excel exists:", fs.existsSync(filePath));

    if (!fs.existsSync(filePath)) {
        throw new Error(
            `Portfolio Excel file not found: ${filePath}`
        );
    }

    const fileBuffer = fs.readFileSync(filePath);

    const workbook = XLSX.read(fileBuffer, {
        type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
        throw new Error("No WorkSheet Found in Excel File");
    }

    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
        throw new Error(
            `Worksheet "${sheetName}" could not be read.`
        );
    }

    return XLSX.utils.sheet_to_json<unknown[]>(
        worksheet,
        {
            header: 1,
            defval: null,
            raw: true,
        }
    );
};