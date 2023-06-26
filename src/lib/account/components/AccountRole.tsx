const AccountRole = (props: any) => {
  return (
    <div>
      <div className="flex justify-between items-center py-3 px-3">
        <h4 className="text-title-light text-[15px]">
          الصلاحية:
          {props.useUserDetailsStore?.userDetails?.isSuperAdmin
            ? "مدير النظام"
            : props.useUserDetailsStore?.userDetails?.role?.title}
        </h4>
        <div
          className="text-[15px] underline text-green-color underline-offset-4 text-right"
          dir="rtl"
        ></div>
      </div>
    </div>
  );
};

export default AccountRole;
