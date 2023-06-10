const FromInput = (props: any) => {
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={`bg-white p-3 rounded-xl w-full outline-1 outline outline-input-border focus:outline-orange-color placeholder:text-input-placeholder placeholder:text-[15px] leading-6 text-title-light ${
          props.errors ? "outline-red-500 focus:outline-red-500" : ""
        }`}
        {...props.register(`${props.name}`, { required: true })}
      />
      {props.errors && (
        <span className=" text-red-600 text-[13px] mb-3 inline-block">
          {props.errorMessage}
        </span>
      )}
    </>
  );
};

export default FromInput;
