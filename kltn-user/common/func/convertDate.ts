const convertDate = (date: string | null, message?: string) => {
  const newDate = new Date(date || "");
  let h: any = newDate.getHours();
  let m: any = newDate.getMinutes();
  let s: any = newDate.getSeconds();
  let yyyy: any = newDate.getFullYear();
  let mm: any = newDate.getMonth() + 1;
  let dd: any = newDate.getDate();

  return {
    getDateText() {
      return date
        ? `ngày ${checkTime(dd)} tháng ${checkTime(mm)} năm ${yyyy}`
        : message;
    },
    getDate() {
      return date ? `${yyyy}-${checkTime(mm)}-${checkTime(dd)}` : message;
    },
    getTime() {
      return date ? `${checkTime(h)}:${checkTime(m)}` : message;
    },
    getFullTime() {
      return date ? `${checkTime(h)}:${checkTime(m)}:${checkTime(s)}` : message;
    },
    getFullDateTime() {
      return date
        ? `${checkTime(h)}:${checkTime(m)}, ${checkTime(dd)}/${checkTime(
            mm
          )}/${yyyy}`
        : message;
    },
  };
};

function checkTime(i: any) {
  if (Math.abs(i) < 10) {
    i = "0" + i;
  }
  return i;
}

export function catDateAndId(date: any, id: any) {
  const newDate = new Date(date);
  let yyyy: any = newDate.getFullYear();
  let mm: any = newDate.getMonth() + 1;
  let dd: any = newDate.getDate();

  return `${yyyy}${mm}${dd}${id}`;
}

export default convertDate;
