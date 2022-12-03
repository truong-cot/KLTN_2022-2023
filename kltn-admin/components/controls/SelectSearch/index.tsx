import { useState } from "react";
import Select, { StylesConfig } from "react-select";

import Dropdown from "./components/Dropdown";
import { ChevronDown, DropdownIndicator } from "./components/SvgIcon";
import styles from "./SelectSearch.module.scss";

const stateOptions = [
  { value: "1", label: "Hà Tĩnh" },
  { value: "2", label: "Hà Nội" },
  { value: "3", label: "Sơn La" },
  { value: "4", label: "Hồ Chí Minh" },
  { value: "5", label: "Nghệ Anh" },
  { value: "6", label: "Thanh Hóa" },
  { value: "7", label: "Bắc Ninh" },
  { value: "8", label: "Bắc Giang" },
  { value: "9", label: "Cao Bằng" },
  { value: "10", label: "Hải Dương" },
];

const selectStyles: StylesConfig<any, false> = {
  control: (provided) => ({
    ...provided,
    minWidth: 240,
    marginTop: 8,
  }),
  option: (provided) => ({
    ...provided,
    borderBottom: "1px solid #EAEEF3",
    padding: "10px 12px",
  }),
};

function SelectSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<any>();

  const handleChange = (newValue: any) => {
    setValue(newValue);
    setIsOpen(false);
  };

  // console.log(value);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      target={
        <div
          className={styles.box_value}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <p>{value ? value.label : "Chọn địa điểm"}</p>
          <ChevronDown />
        </div>
      }
    >
      <div className={styles.box_select}>
        <Select
          components={{ IndicatorSeparator: null, DropdownIndicator }}
          controlShouldRenderValue={false}
          menuIsOpen
          onChange={handleChange}
          options={stateOptions}
          placeholder="Tìm kiếm tỉnh thành"
          styles={selectStyles}
        />
      </div>
    </Dropdown>
  );
}

export default SelectSearch;
