export type Satellite = {
	satid: number;
	satname: string;
	intDesignator: string;
	launchDate: string;
	satlat: string;
	satlng: string;
	moreInfo?: MoreInfo;
};

export interface ApiResponse {
	above: Satellite[];
}

export type MoreInfo = {
	name: string;
	norad: number;
	altName?: string;
	originRegistry?: string; // country/org of UN Registry
	operatorOwner?: string;
	operatorOwnerCountry?: string;
	users?: string;
	purpose?: string;
	detailedPurpose?: string;
	orbitClass?: string;
	orbitType?: string;
	longGEO?: number;
	perigree?: number;
	apogee?: number;
	eccentricity?: number;
	inclination?: number;
	period?: number;
	launchMass?: number;
	dryMass?: number;
	launchDate?: string;
	expectedLifetime?: number;
	contractor?: string;
	contractorCountry?: string;
	launchSite?: string;
	launchVehicle?: string;
	cospar?: string;
	comments?: string;
	source?: string[];
};

export interface SatelliteInfoCollection {
	[satId: string]: any;
}

export type Coordinates = {
	lat: number;
	lon: number;
};

export type ControlsType = {
	coordinates: Coordinates;
	category: Category;
	radius: number;
};

export enum Category {
	All = 0,
	Brightest,
	ISS,
	Weather,
	NOAA,
	GOES,
	EarthResources,
	DisasterMonitoring,
	SearchAndRescue,
	TrackingAndDataRelaySatelliteSystem,
	Geostationary,
	Intelsat,
	Gorizont,
	Raduga,
	Molniya,
	Iridium,
	Orbcomm,
	Globalstar,
	AmateurRadio,
	Experimental,
	GlobalPositioningSystemOperational,
	GlonassOperational,
	Galileo,
	SatelliteBasedAugmentationSystem,
	NavyNavigationSatelliteSystem,
	RussianLEONavigation,
	SpaceAndEarthScience,
	Geodetic,
	Engineering,
	Education,
	Military,
	RadarCalibration,
	CubeSats,
	TV,
	XMSirius,
	BeidouNavigationSystem,
	Yaogan,
	WestfordNeedles,
	Parus,
	Gonets,
	Strela,
	Tselina,
	Tsikada,
	Tsiklon,
	O3BNetworks,
	Celestis,
	IRNSS,
	QZSS,
	Flock,
	Lemur,
	GlobalPositioningSystemConstellation,
	GlonassConstellation,
	Starlink,
	OneWeb,
	ChineseSpaceStation,
}
