import { MoreInfo, Satellite } from "../types";
import "../css/moreInfoStyles.css";
import MoreInfoListItem from "./MoreInfoListItem";

interface MoreInfoProps {
	moreInfo: MoreInfo;
	setMoreInfoSelected: React.Dispatch<React.SetStateAction<Satellite | null>>;
}

const MoreInfoSection: React.FC<MoreInfoProps> = ({
	moreInfo,
	setMoreInfoSelected,
}) => {
	return (
		<>
			<h1>More Information</h1>
			<button onClick={() => setMoreInfoSelected(null)}>Go Back 👈</button>
			<ul className="more-info-list">
				{Object.keys(moreInfo).map((infoKey) => (
					<MoreInfoListItem
						key={infoKey}
						moreInfo={moreInfo}
						infoKey={infoKey}
					/>
				))}
			</ul>
		</>
	);
};

export default MoreInfoSection;
