import { Oval } from "react-loader-spinner";

const BtnLoading = () => {
  return (
    <Oval
      height={25}
      width={25}
      color="#ffffff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#FFFFFF5B"
      strokeWidth={4}
      strokeWidthSecondary={4}
    />
  );
};

export default BtnLoading;
