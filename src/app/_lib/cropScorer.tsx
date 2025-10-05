interface MonthData {
	temp: number; // °C
	precipitation: number; // mm
	soilMoisture: number; // 0–1
}

interface PlayerData {
	hum: number; // 0–100 (irrigation)
	rain: number; // 0–100 (fertilizer)
}

interface Crop {
	name: string;
}

/**
 * Calculates crop success percentage (0–100)
 * and generates feedback messages + parameter values
 */
export function calculateCropSuccess(
	monthData: MonthData,
	player: PlayerData,
	crop: Crop
): { success: number; feedback: string[]; parameters: Record<string, number> } {
	const { temp, precipitation, soilMoisture } = monthData;
	const { hum, rain } = player;

	// Ideal conditions for crops
	const cropProfiles: Record<
		string,
		{
			idealTemp: [number, number];
			idealMoisture: [number, number];
			idealPrecipitation: [number, number];
			waterNeed: number;
			fertilizerNeed: number;
		}
	> = {
		Wheat: { idealTemp: [15, 25], idealMoisture: [0.5, 0.8], idealPrecipitation: [30, 70], waterNeed: 0.6, fertilizerNeed: 0.5 },
		Tomato: { idealTemp: [18, 28], idealMoisture: [0.5, 0.75], idealPrecipitation: [40, 80], waterNeed: 0.7, fertilizerNeed: 0.6 },
	};

	const profile = cropProfiles[crop.name] || cropProfiles.Wheat;

	// Normalize player input
	const irrigation = hum / 100;
	const fertilizer = rain / 100;

	// EXTREMELY punishing suitability function
	function suitability(value: number, [min, max]: [number, number]): number {
		if (value < min) return Math.pow(value / min, 4); // quartic penalty for low values
		if (value > max) return Math.max(0, 1 - Math.pow((value - max) / max, 4)); // quartic penalty for high values
		return 1; // ideal
	}

	// EXTREMELY punishing effects for player choices
	const irrigationDeviation = Math.abs(irrigation - profile.waterNeed);
	const fertilizerDeviation = Math.abs(fertilizer - profile.fertilizerNeed);
	
	const irrigationEffect = 1 - Math.pow(irrigationDeviation * 3, 2); // squared penalty with multiplier
	const fertilizerEffect = 1 - Math.pow(fertilizerDeviation * 3, 2);

	const tempScore = suitability(temp, profile.idealTemp);
	const precipitationScore = suitability(precipitation, profile.idealPrecipitation);
	const moistureScore = suitability(soilMoisture, profile.idealMoisture);

	// Even more extreme weighting - player mistakes are devastating
	const success = Math.max(
		0,
		Math.min(
			100,
			(tempScore * 0.15 +
				precipitationScore * 0.1 +
				moistureScore * 0.15 +
				irrigationEffect * 0.35 + // Much higher weight
				fertilizerEffect * 0.25) * // Much higher weight
				100
		)
	);

	// Generate textual feedback
	const feedback: string[] = [];

	if (tempScore < 0.1) feedback.push("Temperature is catastrophic for this crop!");
	else if (tempScore < 0.3) feedback.push("Temperature is extremely far from ideal.");
	else if (tempScore < 0.6) feedback.push("Temperature is far from ideal.");
	else if (tempScore < 0.8) feedback.push("Temperature is slightly off.");
	else feedback.push("Temperature is optimal.");

	const totalMoisture = soilMoisture + irrigation;
	if (totalMoisture < 0.2) feedback.push("Soil is bone dry — crop will die without immediate water!");
	else if (totalMoisture < 0.4) feedback.push("Soil is extremely dry — urgently increase water.");
	else if (totalMoisture < 0.5) feedback.push("Soil is too dry — increase water.");
	else if (totalMoisture > 0.95) feedback.push("Soil is flooded — crop is drowning!");
	else if (totalMoisture > 0.85) feedback.push("Soil is waterlogged — drastically reduce water.");
	else if (totalMoisture > 0.75) feedback.push("Soil is too wet — reduce water.");
	else feedback.push("Soil moisture is perfect.");

	if (fertilizerEffect < 0.1) feedback.push("Fertilizer levels are toxic to the crop!");
	else if (fertilizerEffect < 0.3) feedback.push("Fertilizer is extremely far from ideal.");
	else if (fertilizerEffect < 0.6) feedback.push("Fertilizer is far from ideal.");
	else if (fertilizerEffect < 0.8) feedback.push("Fertilizer is slightly off.");
	else feedback.push("Fertilizer application is perfect.");

	const parameters = {
		Temperature: tempScore,
		SoilMoisture: moistureScore,
		Irrigation: irrigationEffect,
		Fertilizer: fertilizerEffect,
	};

	return { success, feedback, parameters };
}