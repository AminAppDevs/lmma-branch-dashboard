const FromInput = (props: any) => {
  return (
    <div className="w-full">
      <input
        type={props.type}
        placeholder={props.placeholder}
        onKeyPress={props.onKeyPress}
        className={`bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-7 text-title-light ${
          props.errors ? "outline-red-500 focus:outline-red-500" : ""
        }`}
        {...props.register}
      />
      {props.errors && (
        <span className=" text-red-600 text-[13px] mb-1 inline-block">
          {props.errorMessage}
        </span>
      )}
    </div>
  );
};

export default FromInput;
