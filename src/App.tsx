import { useState } from "react";
import useFetchData from "./hooks/useFetchData";
import { Category, ControlsType } from "./types";
import SatelliteTable from "./components/SatelliteTable";
import Controls from "./components/Controls";

const App: React.FC = () => {
	const defaultControls: ControlsType = {
		coordinates: {
			//default to my location
			lat: 41.677071,
			lon: -71.259804,
		},
		category: Category.All,
		radius: 25,
	};

	// parse saved controls state from local storage or load default if nothing found
	const [controls, setControls] = useState<ControlsType>(() => {
		const localStorageData = localStorage.getItem("controls");
		if (localStorageData) {
			return JSON.parse(localStorageData);
		} else {
			return defaultControls;
		}
	});

	//pass in controls individually so they can be added to useEffect dependency so if any of them change data will reload
	const { satellites, isPending, error } = useFetchData({
		coordinates: controls.coordinates,
		category: controls.category,
		radius: controls.radius,
	});

	// save new controls
	const handleChangeControls = (newControls: ControlsType): void => {
		setControls(newControls);
		localStorage.setItem("controls", JSON.stringify(newControls));
	};

	return (
		<>
			<h1>Satellite Finder</h1>
			<Controls
				handleChangeControls={handleChangeControls}
				currentControls={controls}
			/>
			{isPending && <h4>Loading...</h4>}
			{error && <h4>No satellites found. Update search parameters.</h4>}
			{!isPending && !error && satellites && (
				<>
					<h4>Displaying {satellites.length} satellites</h4>
					<SatelliteTable satellites={satellites} />
				</>
			)}
		</>
	);
};

export default App;
