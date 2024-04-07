import axios from "axios";
import { useEffect, useState } from "react";
import {
	Satellite,
	ApiResponse,
	MoreInfo,
	SatelliteInfoCollection,
	Coordinates,
	Category,
} from "../types";
import satelliteMoreInfo from "../../data/satellite-more-info.json";

export type UseFetchDataResult = {
	satellites: Satellite[] | null;
	isPending: boolean;
	error: any | null;
	API_ENDPOINT: string;
};

interface UseFetchDataProps {
	coordinates: Coordinates;
	category: Category;
	radius: number;
}

const typedSatelliteMoreInfo: SatelliteInfoCollection =
	satelliteMoreInfo as SatelliteInfoCollection;

const useFetchData = ({
	coordinates,
	category,
	radius,
}: UseFetchDataProps): UseFetchDataResult => {
	const [N2YOsatellites, setN2YOSatellites] = useState<Satellite[] | null>(
		null
	);
	const [isPending, setIsPending] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const [satellites, setSatellites] = useState<Satellite[] | null>(null);

	function transformToMoreInfo(jsonData: any): MoreInfo {
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
			norad: parseInt(jsonData.norad, 10),
			longGEO: jsonData.longGEO ? parseFloat(jsonData.longGEO) : undefined,
			perigree: jsonData.perigree
				? parseInt(jsonData.perigree.replace(/,/g, ""), 10)
				: undefined,
			apogee: jsonData.apogee
				? parseInt(jsonData.apogee.replace(/,/g, ""), 10)
				: undefined,
			eccentricity: jsonData.eccentricity
				? parseFloat(jsonData.eccentricity)
				: undefined,
			inclination: jsonData.inclination
				? parseFloat(jsonData.inclination)
				: undefined,
			period: jsonData.period ? parseFloat(jsonData.period) : undefined,
			launchMass: jsonData.launchMass
				? parseInt(jsonData.launchMass.replace(/,/g, ""), 10)
				: undefined,
			dryMass: jsonData.dryMass
				? parseInt(jsonData.dryMass.replace(/,/g, ""), 10)
				: undefined,
			expectedLifetime: jsonData.expectedLifetime
				? parseInt(jsonData.expectedLifetime, 10)
				: undefined,
			source: sources.length > 0 ? sources : undefined,
		};

		return moreInfo;
	}

	const observer_lat = coordinates.lat;
	const observer_lng = coordinates.lon;
	const observer_alt = 0;
	const search_radius = radius;
	const category_id = category.valueOf();

	const API_ENDPOINT = encodeURIComponent(
		`https://api.n2yo.com/rest/v1/satellite/above/${observer_lat}/${observer_lng}/${observer_alt}/${search_radius}/${category_id}/&apiKey=332V8J-QN86HZ-T2Y59U-58KC`
	);

	const CORS_ENDPOINT = "https://corsproxy.io/?" + API_ENDPOINT;

	useEffect(() => {
		console.log(`FETCHING DATA from category: ${Category[category]}`);
		localStorage.clear();
		const fetchSatellites = async () => {
			setIsPending(true);
			try {
				const response = await axios.get<ApiResponse>(CORS_ENDPOINT);

				const nonDebrisSatellites = response.data.above.filter(
					(satellite) => !satellite.satname.includes("DEB")
				);
				localStorage.setItem("satellites", JSON.stringify(nonDebrisSatellites));
				setN2YOSatellites(nonDebrisSatellites);
				setIsPending(false);
				setError(null);
			} catch (err) {
				setError(err as Error);
				setIsPending(false);
				console.log(err);
			}
		};

		fetchSatellites();
	}, [coordinates, category, radius]);

	useEffect(() => {
		// adding more info in here
		if (N2YOsatellites) {
			const updatedSatellites: Satellite[] | null = N2YOsatellites.map(
				(n2yoSat) => {
					const moreInfoJSON = typedSatelliteMoreInfo[n2yoSat.satid.toString()];
					if (moreInfoJSON) {
						const info: MoreInfo = transformToMoreInfo(moreInfoJSON);

						return { ...n2yoSat, moreInfo: info };
					} else {
						return n2yoSat;
					}
				}
			);
			setSatellites(updatedSatellites);
		}
	}, [N2YOsatellites]);

	return { satellites, isPending, error, API_ENDPOINT };
};

export default useFetchData;
