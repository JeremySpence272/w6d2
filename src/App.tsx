import { useEffect, useState } from "react";
import useFetchData from "./hooks/useFetchData";
import { Satellite } from "./types";
import SatelliteTable from "./components/SatelliteTable";

const App: React.FC = () => {
	const { satellites: satData, isPending, error } = useFetchData();
	const [satellites, setSatellites] = useState<Satellite[] | null>(null);

	useEffect(() => {
		if (satData) {
			setSatellites(satData);
		}
	}, [satData]);

	return (
		<>
			<h1>Satellites</h1>
			{isPending && <h4>Loading...</h4>}
			{error && <h4>Error fetching date...</h4>}
			{!isPending && !error && satellites && (
				<>
					<h4>Displaying {satellites.length} satellites</h4>
					<SatelliteTable satellites={satellites} />
					{/* <ul>
						{satellites.map((sat) => (
							<li key={sat.satid}>
								{sat.satid}
								{sat.moreInfo && <p>{JSON.stringify(sat.moreInfo)}</p>}
							</li>
						))}
					</ul> */}
				</>
			)}
		</>
	);
};

export default App;
