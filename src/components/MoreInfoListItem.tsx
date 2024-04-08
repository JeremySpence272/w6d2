import { MoreInfo } from "../types";

interface MoreInfoListItemProps {
	infoKey: string;
	moreInfo: MoreInfo;
}

const MoreInfoListItem: React.FC<MoreInfoListItemProps> = ({
	infoKey,
	moreInfo,
}) => {
	const value = moreInfo[infoKey as keyof MoreInfo];
	const isSource = infoKey === "source";

	// map from camel case to readable names
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
		"source": "Source",
	};

	if (!value) return null;

	return (
		<li key={infoKey} className={infoKey}>
			<span className="more-info-key">
				{moreInfoFieldMap[infoKey as keyof typeof moreInfoFieldMap]}
			</span>
			{" : "}
			{isSource && moreInfo.source ? ( // handle the sources list
				<ul>
					{moreInfo.source.map((link, index) => (
						<li key={index}>
							<a href={link}>{`Source ${index + 1}`}</a>
						</li>
					))}
				</ul>
			) : (
				value
			)}
		</li>
	);
};

export default MoreInfoListItem;
