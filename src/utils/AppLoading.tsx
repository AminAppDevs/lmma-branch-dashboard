import { Oval } from "react-loader-spinner";

const AppLoading = () => {
  return (
    <div className="w-full py-6 flex justify-center">
      <Oval
        height={30}
        width={30}
        color="#F1646D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#F1646D"
        strokeWidth={4}
        strokeWidthSecondary={4}
      />
    </div>
  );
};

export default AppLoading;
