import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";
import csv from "csvtojson";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = join(__dirname, "satellite-more-info.csv");

csv()
	.fromFile(path)
	.then((jsonObj) => {
		const satellites = jsonObj.reduce((acc, cur) => {
			acc[cur["norad"]] = cur;
			return acc;
		}, {});

		fs.writeFileSync(
			join(__dirname, "satellite-more-info.json"),
			JSON.stringify(satellites, null, 2)
		);
	});
