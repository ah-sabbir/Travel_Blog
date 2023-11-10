import { Dispatch, FC, SetStateAction } from "react";
import Select from "react-select";

export interface ISelectOption {
  value: string;
  label: string;
}

interface Props {
  options: ISelectOption[];
  onChange: Dispatch<SetStateAction<ISelectOption>>;
  defaultValue?: ISelectOption;
  value: ISelectOption;
  label: string;
  labelCustomClasses?: string;
  id: string;
  wrapperCustomClasses?: string;
}

const customStyles = {
  control: (styles: any) => ({
    ...styles,
    borderColor: "#e5e7eb",
    borderRadius: "6px",
    padding: "5px 8px",
  }),
};

const FormOptimzedSelect: FC<Props> = ({
  options,
  onChange,
  defaultValue,
  value,
  label,
  labelCustomClasses,
  wrapperCustomClasses,
  id,
}): JSX.Element => {
  return (
    <div className={`mb-4 ${wrapperCustomClasses}`}>
      <label htmlFor={id} className={`form-input-label ${labelCustomClasses}`}>
        {label}
      </label>
      <Select
        id={id}
        options={options}
        className="!outline-none"
        onChange={onChange as any}
        defaultValue={defaultValue}
        value={value}
        styles={customStyles}
      />
    </div>
  );
};

export default FormOptimzedSelect;
