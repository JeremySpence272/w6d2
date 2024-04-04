import React, { useState } from "react";
import "../css/satelliteTableStyles.css";
import { MoreInfo, Satellite } from "../types";

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

	const moreInfoKeys: (keyof MoreInfo)[] = [
		"name",
		"norad",
		"altName",
		"originRegistry",
		"operatorOwner",
		"operatorOwnerCountry",
		"users",
		"purpose",
		"detailedPurpose",
		"orbitClass",
		"orbitType",
		"longGEO",
		"perigree",
		"apogee",
		"eccentricity",
		"inclination",
		"period",
		"launchMass",
		"dryMass",
		"launchDate",
		"expectedLifetime",
		"contractor",
		"contractorCountry",
		"launchSite",
		"launchVehicle",
		"cospar",
		"comments",
		"source",
	];

	const handleMoreInfoClick = (sat: Satellite): void => {
		if (!moreInfoSelected || moreInfoSelected.satid !== sat.satid) {
			setMoreInfoSelected(sat);
		} else {
			setMoreInfoSelected(null);
		}
	};

	return (
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
									<button onClick={() => handleMoreInfoClick(sat)}>
										More Info
									</button>
								) : (
									"No Other Data"
								)}
							</td>
						</tr>
						{sat.moreInfo &&
							moreInfoSelected &&
							moreInfoSelected.satid === sat.satid && (
								<tr>
									<td colSpan={keys.length}>
										<table>
											<tbody>
												{moreInfoKeys.map((infoKey) => (
													<tr key={infoKey}>
														<td>{infoKey}</td>
														<td>{sat.moreInfo![infoKey]}</td>
													</tr>
												))}
											</tbody>
										</table>
									</td>
								</tr>
							)}
					</React.Fragment>
				))}
			</tbody>
		</table>
	);
};

export default SatelliteTable;
