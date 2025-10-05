import React, { useState } from "react";
import CropDialog from "./CropDialog";

interface Crop {
	name: string;
	src: string;
	hoverSrc: string;
	fertilizer: string;
	soilMoisture: string;
	water: string;
}

interface CropButtonProps {
	crop: Crop;
	setCrop: (crop: Crop) => void;
}

export default function CropButton({ crop, setCrop }: CropButtonProps) {
	const [hovered, setHovered] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none focus:outline-none"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => setDialogOpen(true)}
			>
				<img
					src={hovered ? crop.hoverSrc : crop.src}
					alt={crop.name}
					width={414}
					height={330}
					className="transition-all duration-300 ease-in-out cursor-pointer"
					draggable="false"
				/>
			</button>

			{/* Hover info tooltip */}
			{hovered && !dialogOpen && (
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-[220px] w-64 bg-white text-gray-800 rounded-lg p-4 shadow-lg z-50">
					<h3 className="font-bold text-lg mb-2">{crop.name} Info</h3>
					<ul className="text-sm space-y-1">
						<li>Fertilizer: {crop.fertilizer}</li>
						<li>Soil Moisture: {crop.soilMoisture}</li>
						<li>Water Needs: {crop.water}</li>
					</ul>
				</div>
			)}

			{/* Crop selection dialog */}
			{dialogOpen && (
				<CropDialog
					onClose={() => setDialogOpen(false)}
					onSelect={(newCrop) => {
						setCrop(newCrop);
						setDialogOpen(false);
					}}
				/>
			)}
		</>
	);
}
