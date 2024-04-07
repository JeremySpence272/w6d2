import { MoreInfo, Satellite } from "../types";
import "../css/moreInfoStyles.css";

interface MoreInfoProps {
	moreInfo: MoreInfo;
	setMoreInfoSelected: React.Dispatch<React.SetStateAction<Satellite | null>>;
}

const MoreInfoSection: React.FC<MoreInfoProps> = ({
	moreInfo,
	setMoreInfoSelected,
}) => {
	const moreInfoFieldMap = {
		"name": "Name of Satellite",
		"norad": "NORAD Number",
		"altName": "Alternate Names",
		"originRegistry": "Country/Org of UN Registry",
		"operatorOwner": "Operator/Owner",
		"operatorOwnerCountry": "Country of Operator/Owner",
		"users": "Users",
		"purpose": "Purpose",
		"detailedPurpose": "Detailed Purpose",
		"orbitClass": "Class of Orbit",
		"orbitType": "Type of Orbit",
		"longGEO": "Longitude of GEO (degrees)",
		"perigree": "Perigee (km)",
		"apogee": "Apogee (km)",
		"eccentricity": "Eccentricity",
		"inclination": "Inclination (degrees)",
		"period": "Period (minutes)",
		"launchMass": "Launch Mass (kg.)",
		"dryMass": "Dry Mass (kg.)",
		"launchDate": "Date of Launch",
		"expectedLifetime": "Expected Lifetime (yrs.)",
		"contractor": "Contractor",
		"contractorCountry": "Country of Contractor",
		"launchSite": "Launch Site",
		"launchVehicle": "Launch Vehicle",
		"cospar": "COSPAR Number",
		"comments": "Comments",
		"sources": "Sources",
	};

	return (
		<>
			<h1>More Information</h1>
			<button onClick={() => setMoreInfoSelected(null)}>Go Back 👈</button>
			<ul className="more-info-list">
				{Object.keys(moreInfoFieldMap)
					.filter(
						(key) =>
							moreInfo[key as keyof MoreInfo] !== null &&
							moreInfo[key as keyof MoreInfo] !== ""
					)
					.map((infoKey) =>
						infoKey !== "sources" ? (
							<li key={infoKey}>
								<span className="more-info-key">
									{moreInfoFieldMap[infoKey as keyof typeof moreInfoFieldMap]}
								</span>
								{" : " + moreInfo[infoKey as keyof MoreInfo]}
							</li>
						) : (
							moreInfo.source && (
								<li key="sources">
									<span className="more-info-key">Sources :</span>
									<ul>
										{moreInfo.source!.map((link, index) => (
											<li key={index}>
												<a href={link}>{`Source ${index + 1}`}</a>
											</li>
										))}
									</ul>
								</li>
							)
						)
					)}
			</ul>
		</>
	);
};

export default MoreInfoSection;
