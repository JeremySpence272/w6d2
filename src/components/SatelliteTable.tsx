import React, { useState } from "react";
import "../css/satelliteTableStyles.css";
import { Satellite } from "../types";
import MoreInfoSection from "./MoreInfoSection";

interface SatelliteTableProps {
	satellites: Satellite[];
}

const SatelliteTable: React.FC<SatelliteTableProps> = ({ satellites }) => {
	const [moreInfoSelected, setMoreInfoSelected] = useState<Satellite | null>(
		null
	);
	const keys: string[] = [
		"Norad Number",
		"Satellite Name",
		"International Designator",
		"Launch Date",
		"Latitude",
		"Longitude",
		"More Info",
	];

	return (
		<>
			{moreInfoSelected ? (
				<MoreInfoSection
					setMoreInfoSelected={setMoreInfoSelected}
					moreInfo={moreInfoSelected.moreInfo!}
				/>
			) : (
				<table>
					<thead>
						<tr>
							{keys.map((key) => (
								<th key={key}>{key}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{satellites.map((sat) => (
							<React.Fragment key={sat.satid}>
								<tr>
									<td>{sat.satid}</td>
									<td>{sat.satname}</td>
									<td>{sat.intDesignator}</td>
									<td>{sat.launchDate}</td>
									<td>{sat.satlat}</td>
									<td>{sat.satlng}</td>
									<td>
										{sat.moreInfo ? (
											<button onClick={() => setMoreInfoSelected(sat)}>
												More Info 🛰️
											</button>
										) : (
											"No Other Data"
										)}
									</td>
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default SatelliteTable;
