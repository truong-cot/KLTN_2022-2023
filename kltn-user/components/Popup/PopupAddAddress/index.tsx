import React, {useState} from 'react';

import styles from './PopupAddAddress.module.scss';

import InputLight from '~/components/controls/InputLight';
import Select from 'react-select';
import useLocationForm from '~/common/hooks/useLocationForm';
import Button from '~/components/controls/Button';

interface TypeFrom {
	name: string;
	phone: string;
	city: string;
	district: string;
	ward: string;
}

interface TypePopup {
	onClose: () => void;
}

function PopupAddAddress({onClose}: TypePopup) {
	const [city, setCity] = useState<any>('');
	const [district, setDistrict] = useState<any>('');
	const [ward, setWard] = useState<any>('');

	// tạo state để lưu giá trị của form
	const [valueForm, setValueForm] = useState<TypeFrom>({
		name: '',
		phone: '',
		city: '',
		district: '',
		ward: '',
	});
	// lấy dữ liệu từ input
	const handleChangeInput = (e: any) => {
		const {name, value} = e.target;
		setValueForm((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	// Style react-select
	const customStyles = {
		control: (base: any) => ({
			...base,
			margin: '0px',
		}),

		valueContainer: (provided: any, state: any) => ({
			...provided,
			margin: '0px',
			padding: '13px',
		}),

		input: (provided: any, state: any) => ({
			...provided,
			margin: '0px',
			padding: '0',
		}),
	};

	const {state, onCitySelect, onDistrictSelect, onWardSelect} = useLocationForm(true);
	const {
		cityOptions,
		districtOptions,
		wardOptions,
		selectedCity,
		selectedDistrict,
		selectedWard,
	} = state;

	const getCity = (option: any) => {
		onCitySelect(option);
		setCity(option);
	};

	const getDistrict = (option: any) => {
		onDistrictSelect(option);
		setDistrict(option);
	};
	const getWard = (option: any) => {
		onWardSelect(option);
		setWard(option);
	};

	valueForm.city = city.label;
	valueForm.district = district.label;
	valueForm.ward = ward.label;

	const handleSave = () => {
		console.log(valueForm);
	};

	return (
		<div className={styles.container}>
			<div className={styles.form_1}>
				<div className={styles.box_title}>
					<h4 className={styles.title}>Thêm địa chỉ nhận hàng</h4>
				</div>
				<InputLight
					name='name'
					onChange={handleChangeInput}
					type='text'
					placeholder='Nhập vào họ tên...'
					label='Họ tên người nhân:'
				/>
				<InputLight
					name='phone'
					onChange={handleChangeInput}
					type='number'
					placeholder='Nhập vào số điện thoại...'
					label='Số điện thoại người nhân:'
				/>
			</div>
			<div className={styles.selection}>
				<div className={styles.text}>
					<p>Tỉnh/ Thành phố:</p>
				</div>
				<Select
					styles={customStyles}
					className={styles.select}
					name='cityId'
					isDisabled={cityOptions.length === 0}
					options={cityOptions}
					onChange={getCity}
					placeholder='Tỉnh/Thành'
					defaultValue={selectedCity}
				/>
			</div>

			<div className={styles.selection}>
				<div className={styles.text}>
					<p>Quận/ Huyện:</p>
				</div>
				<Select
					styles={customStyles}
					className={styles.select}
					name='districtId'
					isDisabled={districtOptions.length === 0}
					options={districtOptions}
					onChange={getDistrict}
					placeholder='Quận/Huyện'
					defaultValue={selectedDistrict}
				/>
			</div>

			<div className={styles.selection}>
				<div className={styles.text}>
					<p>Xã/ Phường:</p>
				</div>
				<Select
					styles={customStyles}
					className={styles.select}
					name='wardId'
					isDisabled={wardOptions.length === 0}
					options={wardOptions}
					placeholder='Phường/Xã'
					onChange={getWard}
					defaultValue={selectedWard}
				/>
			</div>

			<div className={styles.box_specific}>
				<InputLight
					name='specific'
					onChange={handleChangeInput}
					type='text'
					placeholder='Nhập vào địa chỉ cụ thể...'
					label='Địa chỉ cụ thể:'
				/>
			</div>

			<div className={styles.group_btn}>
				<Button onClick={onClose}>HỦY</Button>
				<Button className={styles.save} onClick={handleSave}>
					THÊM
				</Button>
			</div>
		</div>
	);
}

export default PopupAddAddress;
