import React, {useState} from 'react';

import styles from './PopupAddAddress.module.scss';
import Select from 'react-select';
import {Fragment} from 'react';
import useLocationForm from '~/common/hooks/useLocationForm';
import InputLight from '~/components/controls/InputLight';
import Button from '~/components/controls/Button';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import userService from '~/api/user';
import LoadingData from '~/components/common/LoadingData';
import {updateDataUser} from '~/redux/reducers/userSlice';

interface TypeFrom {
	name: string;
	phone: string;
	city: string;
	district: string;
	ward: string;
	specific: String;
}

interface TypePopup {
	onClose: () => void;
}

function PopupAddAddress({onClose}: TypePopup) {
	const dispatch = useDispatch();

	const {token} = useSelector((state: RootState) => state.auth);
	const {userData} = useSelector((state: RootState) => state.user);

	const [isLoading, setIsLoading] = useState<boolean>(false);

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
		specific: '',
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

	const handleAddAddress = async () => {
		if (
			valueForm.name &&
			valueForm.phone &&
			valueForm.city &&
			valueForm.district &&
			valueForm.ward &&
			valueForm.specific
		) {
			setIsLoading(true);

			const res: any = await userService.addAddress({
				token: String(token),
				idUser: userData._id,
				name: valueForm.name,
				phone: Number(valueForm.phone),
				city: valueForm.city,
				district: valueForm.district,
				ward: valueForm.ward,
				specifically: valueForm.specific,
			});

			if (res.status === 1) {
				setIsLoading(false);
				toast.success(res.message || 'Thêm địa chỉ thành thành công!');
				dispatch(updateDataUser(res.data));
				onClose();
			} else if (res.status === 0) {
				toast.warn(res.message || 'Thêm địa chỉ không thành công!');
				setIsLoading(false);
				onClose();
			}
		} else {
			toast.warn('Vui lòng nhập đầy đủ thông tin!');
		}
	};

	return (
		<LoadingData isLoading={isLoading}>
			<div className={styles.container}>
				<h4 className={styles.title}>THÊM ĐỊA CHỈ NHẬN HÀNG</h4>
				<div className={styles.form_1}>
					<InputLight
						name='name'
						onChange={handleChangeInput}
						type='text'
						placeholder='Nhập vào họ tên...'
						label='Họ tên người nhân:'
					/>
					<div>
						<InputLight
							name='phone'
							onChange={handleChangeInput}
							type='number'
							placeholder='Nhập vào số điện thoại...'
							label='Số điện thoại người nhân:'
						/>
					</div>
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
					<Button onClick={onClose} className={styles.btn_2} p_10_32>
						Hủy
					</Button>
					<Button className={styles.btn_1} p_10_32 onClick={handleAddAddress}>
						Thêm địa chỉ
					</Button>
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupAddAddress;
