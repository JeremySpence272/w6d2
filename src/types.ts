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
