import clsx from 'clsx';
import {Fragment, memo, ReactNode, useEffect, useState} from 'react';
import {IoEyeOutline, IoEyeOffOutline} from 'react-icons/io5';
import {useStyleClass} from '~/common/hooks/usStyleClass';
import styles from './InputLight.module.scss';

interface props {
	Icon?: any;
	className?: string;
	label?: string;
	type?: string;
	children?: ReactNode;
	placeholder?: string;
	required?: boolean;
	message?: string;
	name?: string;
	onFocus?: any;
	iconLeft?: ReactNode;
	onGetCodePhone?: (code: string) => void;
	[props: string]: any;
}

function InputLight({
	type = 'text',
	children,
	label = '',
	className,
	name,
	placeholder,
	message,
	onFocus,
	required = false,
	iconLeft,
	onGetCodePhone,
	Icon,
	...props
}: props) {
	const [showPass, setShowPass] = useState<boolean>(false);
	const [showCodePhone, setShowCodePhone] = useState<boolean>(false);
	const [codePhoneSelect, setCodePhoneSelect] = useState<string>('+84');
	const [error, setError] = useState<any>(message);
	const isPassword = type === 'password';

	useEffect(() => {
		if (onGetCodePhone) {
			onGetCodePhone(codePhoneSelect);
		}
	}, [codePhoneSelect, onGetCodePhone]);

	useEffect(() => {
		setError(message);
	}, [message]);

	const handleFocus = () => {
		setError(null);
		if (typeof onFocus === 'function') {
			onFocus(name);
		}
	};

	const handleToggleShowPass = () => {
		setShowPass(!showPass);
	};

	const styleClass = useStyleClass(props, styles);
	const hasIconLeft = iconLeft ? styles.hasIconLeft : styles.noIconLeft;
	const hasIconRight = isPassword ? styles.hasIconRight : styles.noIconRight;
	return (
		<Fragment>
			<div
				className={clsx([className, styles.groupForm, styleClass, {[styles.error]: error}])}
			>
				{label != '' && !children && (
					<>
						<div className={styles.groupLabel}>
							<label className={styles.label}>
								{label}
								{required && <span>*</span>}
							</label>
						</div>
					</>
				)}
				{label == '' && children && <>{children}</>}
				{label != '' && children && (
					<>
						<div className={styles.groupLabel}>
							<label className={styles.label}>
								{label}
								{required && <span>*</span>}
							</label>
							{children}
						</div>
					</>
				)}
				<div className={clsx([styles.groupInput, hasIconLeft, hasIconRight])}>
					{iconLeft && <span className={styles.icon_left}>{iconLeft}</span>}
					<div className={styles.input}>
						{Icon && (
							<div className={styles.icon}>
								<Icon />
							</div>
						)}

						<input
							type={showPass ? 'text' : type}
							placeholder={placeholder}
							name={name}
							onFocus={handleFocus}
							{...props}
						/>
					</div>
					{isPassword && (
						<span className={styles.toggleType} onClick={handleToggleShowPass}>
							{showPass ? <IoEyeOutline /> : <IoEyeOffOutline />}
						</span>
					)}
				</div>
				{error && <span className={styles.message}>{error}</span>}
			</div>
		</Fragment>
	);
}

export default memo(InputLight);
