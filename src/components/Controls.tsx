import { useState } from "react";
import { Category, Coordinates, ControlsType } from "../types";
import "../css/controlsStyles.css";

interface ControlsProps {
	handleChangeControls: (controls: ControlsType) => void;
	currentControls: ControlsType;
}

const Controls: React.FC<ControlsProps> = ({
	handleChangeControls,
	currentControls,
}) => {
	// create local instances of the controls to update when fields are changed but not submitted yet
	const [localCoordinates, setLocalCoordinates] = useState<Coordinates>(
		currentControls.coordinates
	);
	const [localCategory, setLocalCategory] = useState<Category>(
		currentControls.category
	);
	const [localRadius, setLocalRadius] = useState<number>(
		currentControls.radius
	);

	// handle local form field updates

	const handleLocationUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalCoordinates((curr) => ({
			...curr,
			[e.target.name]: Number(e.target.value),
		}));
	};

	const handleCategoryUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const key = e.target.value as keyof typeof Category;
		setLocalCategory(Category[key]);
	};

	const handleRadiusUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalRadius(Number(e.target.value));
	};

	// helper to convert from camel case to readable string for the categories
	const convertToReadableCategory = (cat: string): string => {
		if (cat === cat.toUpperCase()) return cat; // handles case of uppercase abbreviations like ISS
		return cat
			.toString()
			.split(/(?=[A-Z])/)
			.join(" ");
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleChangeControls({
					coordinates: localCoordinates,
					category: localCategory,
					radius: localRadius,
				});
			}}
		>
			<div className="field">
				<label htmlFor="lat">Latitude</label>
				<input
					type="number"
					name="lat"
					onChange={handleLocationUpdate}
					value={localCoordinates.lat}
				/>
			</div>
			<div className="field">
				<label htmlFor="lon">Longitude</label>
				<input
					type="number"
					name="lon"
					onChange={handleLocationUpdate}
					value={localCoordinates.lon}
				/>
			</div>
			<div className="field">
				<label htmlFor="category">Satellite Category</label>
				<select
					id="category"
					value={Category[localCategory]}
					name="category"
					onChange={handleCategoryUpdate}
				>
					{Object.keys(Category)
						.filter((key) => isNaN(Number(key)))
						.map((cat) => (
							<option key={cat} value={cat}>
								{convertToReadableCategory(cat)}
							</option>
						))}
				</select>
			</div>
			<div className="field">
				<label htmlFor="radius">
					Search Radius:{" "}
					<a href="https://en.wikipedia.org/wiki/Azimuth">Azimuth</a>(0-90)
				</label>
				<input
					type="number"
					value={localRadius}
					onChange={handleRadiusUpdate}
					name="radius"
					max="90"
					min="10"
				/>
			</div>
			<button className="controls-button" type="submit">
				Submit
			</button>
		</form>
	);
};

export default Controls;
