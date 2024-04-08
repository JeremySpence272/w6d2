import fs from "fs";
import csv from "csvtojson";

const path = "./satellite-more-info.csv";

// convert csv to json for all more info files

csv()
	.fromFile(path)
	.then((jsonObj) => {
		const satellites = jsonObj.reduce((acc, cur) => {
			acc[cur["norad"]] = cur;
			return acc;
		}, {});

		fs.writeFileSync(
			"./satellite-more-info2.json",
			JSON.stringify(satellites, null, 2)
		);
	});
