export type NearEarthObject = {
	id: string;
	absolute_magnitude_h: number;
	close_approach_data: CloseApproachData[];
	designation: string;
	estimated_diameter: Diameter;
	is_potentially_hazardous_asteroid: boolean;
	is_sentry_object: boolean;
	name: string;
	name_limited: string;
	orbital_data: OrbitData;
};

type Diameter = {
	feet: DiameterMaxMin;
	kilometers: DiameterMaxMin;
	meters: DiameterMaxMin;
	miles: DiameterMaxMin;
};

type OrbitClass = {
	orbit_class_type: string;
	orbit_class_description: string;
	orbit_class_range: string;
};

type OrbitData = {
	orbit_id: string;
	orbit_determination_date: string;
	first_observation_date: string;
	last_observation_date: string;
	data_arc_in_days: number;
	observations_used: number;
	orbit_uncertainty: string;
	minimum_orbit_intersection: string;
	jupiter_tisserand_invariant: string;
	epoch_osculation: string;
	eccentricity: string;
	semi_major_axis: string;
	inclination: string;
	ascending_node_longitude: string;
	orbital_period: string;
	perihelion_distance: string;
	perihelion_argument: string;
	aphelion_distance: string;
	perihelion_time: string;
	mean_anomaly: string;
	mean_motion: string;
	equinox: string;
	orbit_class: OrbitClass;
};

type DiameterMaxMin = {
	estimated_diameter_max: number;
	estimated_diameter_min: number;
};

type CloseApproachData = {
	close_approach_date: string;
	close_approach_date_full: string;
	epoch_date_close_approach: number;
	relative_velocity: {
		kilometers_per_second: string;
		kilometers_per_hour: string;
		miles_per_hour: string;
	};
	miss_distance: {
		astronomical: string;
		lunar: string;
		kilometers: string;
		miles: string;
	};
	orbiting_body: string;
};
