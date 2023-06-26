import { NavLink } from "react-router-dom";
import FromInput from "../auth/components/FromInput";
import { useForm } from "react-hook-form";
import SelectInputDark from "../../utils/SelectInputDark";

const AddNewUser = () => {
  const newUserForm = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /// on submit
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="mt-2 lg:container lg:mx-auto px-3">
      <div className="bg-white rounded-xl py-2 px-3 flex items-center justify-between">
        <h3 className="text-title-dark text-[18px] font-semibold">
          أضف موظف جديد
        </h3>
        <NavLink to={"/users/all_users"}>
          <div className="bg-orange-color hover:bg-orange-color-dark rounded-xl px-4 py-2 text-white cursor-pointer">
            كل الموظفين
          </div>
        </NavLink>
      </div>
      <div className="lg:container lg:mx-auto mt-2 bg-white rounded-xl overflow-x-auto p-3">
        {/* new user form */}
        <form onSubmit={newUserForm.handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <FromInput
              placeholder="اسم الموظف"
              type="text"
              errors={newUserForm.formState?.errors?.name}
              errorMessage={newUserForm.formState.errors?.name?.message}
              register={{
                ...newUserForm.register("name", {
                  required: "الاسم مطلوب",
                }),
              }}
            />
            <SelectInputDark label="صلاحية الموظف" />
          </div>
          <button
            type="submit"
            className="h-[50px] w-[150px] mt-3 bg-green-color hover:bg-green-600 transition-colors ease-in-out rounded-xl text-white"
          >
            إضافة الموظف
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
