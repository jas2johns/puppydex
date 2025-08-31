import React, { useState } from "react";
import { dogs } from "@/dogGroups";

export default function ColorSelector() {
	const [selectedColor, setSelectedColor] = useState("");

	const handleChange = (e) => {
		setSelectedColor(e.target.value);
	};

	return (
		<div style={{ fontFamily: "sans-serif" }}>
			<label htmlFor="colorSelect">Choose a color: </label>
			<select
				id="colorSelect"
				value={selectedColor}
				onChange={handleChange}
			>
				<option value=""> -- Select --</option>
				{Object.entries(dogs).map(([colorKey, colorValue]) => (
					<option key={colorKey} value={colorValue}>
						{colorKey.charAt(0).toUpperCase() + colorKey.slice(1)}
					</option>
				))}
			</select>

            {selectedColor && (
				<div>
					<p>You selected: {selectedColor}</p>
					<div
						style={{
							width: "100px",
							height: "100px",
							backgroundColor: selectedColor,
						}}
					/>
				</div>
			)}
		</div>
	);
}
