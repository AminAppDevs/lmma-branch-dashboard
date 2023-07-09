const StoreApproveDetailsRow = ({ data, text }: any) => {
  return (
    <div className="flex justify-between items-center border-b border-dashed p-4">
      <h3 className="text-[15px] text-title-light">
        {text} {data}
      </h3>
      <button type="button" className="text-green-color underline text-[15px]">
        تعديل
      </button>
    </div>
  );
};

export default StoreApproveDetailsRow;
