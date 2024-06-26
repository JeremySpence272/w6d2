import axios from "axios";
import { useEffect, useState } from "react";
import {
	Satellite,
	ApiResponse,
	MoreInfo,
	Coordinates,
	Category,
} from "../types";
import satelliteMoreInfo from "../../data/satellite-more-info.json";

type UseFetchDataResult = {
	satellites: Satellite[] | null;
	isPending: boolean;
	error: any | null;
};

interface UseFetchDataProps {
	coordinates: Coordinates;
	category: Category;
	radius: number;
}

interface SatelliteInfoCollection {
	[satId: string]: any;
}

// convert raw json into type ^ so it can be searched by id
const typedSatelliteMoreInfo: SatelliteInfoCollection =
	satelliteMoreInfo as SatelliteInfoCollection;

const useFetchData = ({
	coordinates,
	category,
	radius,
}: UseFetchDataProps): UseFetchDataResult => {
	const [N2YOsatellites, setN2YOSatellites] = useState<Satellite[] | null>(
		null
	); // satellites without the more info data appended
	const [isPending, setIsPending] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const [satellites, setSatellites] = useState<Satellite[] | null>(null);

	function updateToHandleSourcesList(jsonData: any): MoreInfo {
		const {
			Source1,
			Source2,
			Source3,
			Source4,
			Source5,
			Source6,
			Source7,
			...rest
		} = jsonData;

		// Filter out empty source strings and collect into an array
		const sources = [
			Source1,
			Source2,
			Source3,
			Source4,
			Source5,
			Source6,
			Source7,
		].filter((source) => source);

		const moreInfo: MoreInfo = {
			...rest,
			source: sources.length > 0 ? sources : undefined,
		};

		return moreInfo;
	}

	const observer_lat = coordinates.lat;
	const observer_lng = coordinates.lon;
	const observer_alt = 0; // always 0 for simplicity
	const search_radius = radius;
	const category_id = category.valueOf();

	const API_ENDPOINT = encodeURIComponent(
		`https://api.n2yo.com/rest/v1/satellite/above/${observer_lat}/${observer_lng}/${observer_alt}/${search_radius}/${category_id}/&apiKey=332V8J-QN86HZ-T2Y59U-58KC`
	);

	const CORS_ENDPOINT = "https://corsproxy.io/?" + API_ENDPOINT; // redirect through cors proxy

	useEffect(() => {
		const fetchSatellites = async () => {
			setIsPending(true);
			try {
				const response = await axios.get<ApiResponse>(CORS_ENDPOINT);
				// filter out satellites labeled as debris (DEB)
				const nonDebrisSatellites = response.data.above.filter(
					(satellite) => !satellite.satname.includes("DEB")
				);
				localStorage.setItem("satellites", JSON.stringify(nonDebrisSatellites));
				setN2YOSatellites(nonDebrisSatellites);
				setError(null);
			} catch (err) {
				setError(err as Error);
				console.log(err);
			} finally {
				setIsPending(false);
			}
		};

		fetchSatellites();
	}, [coordinates, category, radius]);

	useEffect(() => {
		// adding more info to N2YO satellites
		if (N2YOsatellites) {
			const updatedSatellites: Satellite[] | null = N2YOsatellites.map(
				(n2yoSat) => {
					const moreInfoJSON = typedSatelliteMoreInfo[n2yoSat.satid.toString()];
					if (moreInfoJSON) {
						const info: MoreInfo = updateToHandleSourcesList(moreInfoJSON);

						return { ...n2yoSat, moreInfo: info };
					} else {
						return n2yoSat;
					}
				}
			);
			setSatellites(updatedSatellites);
		}
	}, [N2YOsatellites]);

	return { satellites, isPending, error };
};

export default useFetchData;
