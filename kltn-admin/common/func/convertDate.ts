const convertDate = (date: string | null, message?: string) => {
	const newDate = new Date(date || '');
	let h: any = newDate.getHours();
	let m: any = newDate.getMinutes();
	let s: any = newDate.getSeconds();
	let yyyy: any = newDate.getFullYear();
	let mm: any = newDate.getMonth() + 1;
	let dd: any = newDate.getDate();

	return {
		getDate() {
			return checkDate(date) ? `${yyyy}-${checkTime(mm)}-${checkTime(dd)}` : message || '--';
		},
		getTime() {
			return checkDate(date) ? `${checkTime(h)}:${checkTime(m)}` : message || '--';
		},
		getFullTime() {
			return checkDate(date)
				? `${checkTime(h)}:${checkTime(m)}:${checkTime(s)}`
				: message || '--';
		},
		getMonthYear() {
			return checkDate(date) ? `${yyyy}-${checkTime(mm)}` : message || '--';
		},
		getFullDateTime() {
			return checkDate(date)
				? `${yyyy}-${checkTime(mm)}-${checkTime(dd)} ${checkTime(h)}:${checkTime(
						m
				  )}:${checkTime(s)}`
				: message || '--';
		},
	};
};

function checkTime(i: any) {
	if (Math.abs(i) < 10) {
		i = '0' + i;
	}
	return i;
}

function checkDate(date: string | null): boolean {
	if (date !== '0001-01-01T00:00:00' && !!date) {
		return true;
	}

	return false;
}

export default convertDate;
