import axios from 'axios';
import {useEffect, useState} from 'react';
import {PATHS} from '~/constants/mock/paths';

interface TypeLocation {
	id: number;
	name: string;
}

interface TypeState {
	cityOptions: Array<any>;
	districtOptions: Array<any>;
	wardOptions: Array<any>;
	selectedCity: string | null;
	selectedDistrict: string | null;
	selectedWard: string | null;
}

const FETCH_TYPES = {
	CITIES: 'FETCH_CITIES',
	DISTRICTS: 'FETCH_DISTRICTS',
	WARDS: 'FETCH_WARDS',
};

async function fetchLocationOptions(fetchType: string, locationId: string | '') {
	let url;
	switch (fetchType) {
		case FETCH_TYPES.CITIES: {
			url = PATHS.CITIES;
			break;
		}
		case FETCH_TYPES.DISTRICTS: {
			url = `${PATHS.DISTRICTS}/${locationId}.json`;
			break;
		}
		case FETCH_TYPES.WARDS: {
			url = `${PATHS.WARDS}/${locationId}.json`;
			break;
		}
		default: {
			return [];
		}
	}

	const locations = (await axios.get(url)).data['data'];
	return locations.map(({id, name}: TypeLocation) => ({value: id, label: name}));
}

async function fetchInitialData() {
	const {cityId, districtId, wardId} = (await axios.get(PATHS.LOCATION)).data;

	const [cities, districts, wards] = await Promise.all([
		fetchLocationOptions(FETCH_TYPES.CITIES, ''),
		fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityId),
		fetchLocationOptions(FETCH_TYPES.WARDS, districtId),
	]);

	return {
		cityOptions: cities,
		districtOptions: districts,
		wardOptions: wards,
		selectedCity: cities.find((c: any) => c.value === cityId),
		selectedDistrict: districts.find((d: any) => d.value === districtId),
		selectedWard: wards.find((w: any) => w.value === wardId),
	};
}

function useLocationForm(shouldFetchInitialLocation: any) {
	const [state, setState] = useState<TypeState>({
		cityOptions: [],
		districtOptions: [],
		wardOptions: [],
		selectedCity: null,
		selectedDistrict: null,
		selectedWard: null,
	});

	const {selectedCity, selectedDistrict}: any = state;

	useEffect(() => {
		(async () => {
			if (shouldFetchInitialLocation) {
				const initialData = await fetchInitialData();
				setState(initialData);
			} else {
				const options = await fetchLocationOptions(FETCH_TYPES.CITIES, '');
				setState({...state, cityOptions: options});
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (!selectedCity) {
				return;
			} else {
				const options = await fetchLocationOptions(
					FETCH_TYPES.DISTRICTS,
					selectedCity.value
				);
				setState({...state, districtOptions: options});
			}
		})();
	}, [selectedCity]);

	useEffect(() => {
		(async () => {
			if (!selectedDistrict) {
				return;
			} else {
				const options = await fetchLocationOptions(
					FETCH_TYPES.WARDS,
					selectedDistrict.value
				);
				setState({...state, wardOptions: options});
			}
		})();
	}, [selectedDistrict]);

	const onCitySelect = (option: any) => {
		setState({
			...state,
			districtOptions: [],
			wardOptions: [],
			selectedCity: option,
			selectedDistrict: null,
			selectedWard: null,
		});
	};

	const onDistrictSelect = (option: any) => {
		setState({
			...state,
			wardOptions: [],
			selectedDistrict: option,
			selectedWard: null,
		});
	};

	const onWardSelect = (option: any) => {
		setState({...state, selectedWard: option});
	};

	return {state, onCitySelect, onDistrictSelect, onWardSelect};
}

export default useLocationForm;
