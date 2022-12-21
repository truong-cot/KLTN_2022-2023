import React, {useState} from 'react';
import Select from 'react-select';
import Image from 'next/image';

import styles from './MainProfile.module.scss';
import Button from '~/components/controls/Button';
import {dateBirths, monthBirths, sexs, yearBirths} from '~/constants/mock/variable';
import {ImPencil} from 'react-icons/im';
import backgrounds from '~/constants/images/backgrounds';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function MainProfile() {
	const {userData} = useSelector((state: RootState) => state.user);
	// Style react-select
	const customStyles = {
		control: (base: any) => ({
			...base,
			margin: '0px',
		}),

		valueContainer: (provided: any, state: any) => ({
			...provided,
			margin: '0px',
			padding: '11px',
		}),

		input: (provided: any, state: any) => ({
			...provided,
			margin: '0px',
			padding: '0',
		}),
	};

	const [dateBirth, setDateBirth] = useState<string>('');
	const [monthBirth, setMonthBirth] = useState<string>('');
	const [yearBirth, setYearBirth] = useState<string>('');
	const [sex, setSex] = useState<string>('');

	console.log(userData);

	const [form, setForm] = useState<any>({
		name: userData.name,
		dateBirth: userData.dateBirth,
		monthBirth: '',
		yearBirth: '',
		sex: '',
		phone: '',
		email: '',
	});

	const handleChange = (e: any) => {
		const {name, value} = e.target;
		setForm((prev: any) => ({...prev, [name]: value}));
	};

	form.dateBirth = dateBirth;
	form.monthBirth = monthBirth;
	form.yearBirth = yearBirth;
	form.sex = sex;

	const handleSubmit = () => {
		console.log(form);
	};

	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<p className={styles.text}>Thông tin cá nhân</p>
				<div className={styles.box_top}>
					<div className={styles.box_change_avatar}>
						<Image
							className={styles.image}
							objectFit='cover'
							src={backgrounds.image_product}
							alt='avatar'
							layout='fill'
						/>
						<div className={styles.box_icon}>
							<ImPencil className={styles.icon} />
						</div>
					</div>
					<div className={styles.box_info}>
						<div className={styles.box_name}>
							<p className={styles.text_info}>Họ và tên:</p>
							<input
								type='text'
								placeholder='Thay đổi tên người dùng'
								value={form.name}
								name='name'
								onChange={handleChange}
							/>
						</div>
						<div className={styles.box_user_acc}>
							<p className={styles.text_info}>Tên tài khoản:</p>
							<input
								type='text'
								placeholder='Tên tài khoản'
								value={userData.username}
							/>
						</div>
					</div>
				</div>

				<div className={styles.box_date}>
					<p className={styles.text_date}>Ngày sinh:</p>
					<div className={styles.box_select}>
						<select>
							<option value={dateBirth} label='Ngày sinh'></option>
						</select>
						{/* <Select
							styles={customStyles}
							className={styles.select}
							placeholder='Ngày sinh'
							options={dateBirths}
							onChange={(option: any) => setDateBirth(option.value)}
						/> */}
						<Select
							styles={customStyles}
							className={styles.select}
							placeholder='Tháng sinh'
							options={monthBirths}
							onChange={(option: any) => setMonthBirth(option.value)}
						/>
						<Select
							styles={customStyles}
							className={styles.select}
							placeholder='Năm sinh'
							options={yearBirths}
							onChange={(option: any) => setYearBirth(option.value)}
						/>
					</div>
				</div>

				<div className={styles.box_date}>
					<p className={styles.text_date}>Giới tính:</p>
					<div className={styles.box_select}>
						<Select
							styles={customStyles}
							className={styles.select}
							placeholder='Giới tính'
							options={sexs}
							onChange={(option: any) => setSex(option.value)}
						/>
					</div>
				</div>

				<div className={styles.box_date}>
					<p className={styles.text_info}>Số điện thoại:</p>
					<input
						type='text'
						value={form.phone}
						name='phone'
						onChange={handleChange}
						placeholder='Thay đổi số điện thoại'
					/>
				</div>

				<div className={styles.box_date}>
					<p className={styles.text_info}>Địa chỉ email:</p>
					<input
						type='text'
						value={form.email}
						name='email'
						onChange={handleChange}
						placeholder='Thay đổi số email'
					/>
				</div>

				<div className={styles.box_btn}>
					<Button primary3 p_8_24 onClick={handleSubmit}>
						Thay đổi thông tin cá nhân
					</Button>
				</div>
			</div>
		</div>
	);
}

export default MainProfile;
