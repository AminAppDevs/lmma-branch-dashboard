import Select from "react-tailwindcss-select";

const SelectInputDark = (props: any) => {
  return (
    <div className="mb-2 w-full">
      {!props.label ? (
        <></>
      ) : (
        <div className="text-[14px] text-title-light mb-1">
          {props.label}
          <span>
            {props.isRequire ? (
              <span className="text-red-color">*</span>
            ) : (
              <></>
            )}
          </span>
        </div>
      )}
      <Select
        value={props.value}
        noOptionsMessage="لا توجد خيارات"
        onChange={(val: any) => props.onChange(val)}
        options={props.options}
        isMultiple={props.isMultiple}
        primaryColor="#f9f9"
        placeholder={props.placeholder}
        classNames={{
          menuButton: () => `
          bg-white border border-input-border rounded-xl cursor-pointer placeholder:text-placeholder-color text-title-light flex py-[6px] px-2`,
          menu: "py-2 rounded-xl absolute z-10 w-full bg-white p-0 mt-1 shadow-sm text-right border-[#eee] border focus:outline-none",
          listItem: ({ isSelected }: any) =>
            `py-2 text-title-light cursor-pointer hover:rounded-xl my-1 list-none m-0 hover:bg-opacity-10  hover:bg-primary-color px-2 ${
              isSelected
                ? "bg-primary-color text-white rounded-xl hover:text-white hover:bg-opacity-100"
                : ""
            }`,
          tagItem: () =>
            `bg-primary-color flex px-4 m-0 py-[5px] rounded-full text-white`,
          tagItemText: "text-white text-[12px]",
          tagItemIconContainer: "hover:bg-transparent p-0 pt-[2px] pr-[3px]",
        }}
      />
    </div>
  );
};

export default SelectInputDark;
