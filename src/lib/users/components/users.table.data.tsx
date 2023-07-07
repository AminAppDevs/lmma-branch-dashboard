import { ColumnDef } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";

export type BranchUser = {
  id: string;
  name: number;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export const getUsersTableData = (data: any) => {
  const admins = data.filter((value: any) => !value.isSuperAdmin);
  const result: BranchUser[] = admins?.map((value: any) => {
    return {
      id: `${value.id}#`,
      name: value.name,
      email: value.email,
      phone: value.phone,
      role: value.role ? value.role.title : "مدير النظام",
      isActive: value.isActive,
      createdAt: value.createdAt,
    };
  });
  return result;
};

export const branchUserColumns: ColumnDef<BranchUser>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium text-title-dark">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "الإسم",
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "phone",
    header: "رقم الجوال",
  },
  {
    accessorKey: "role",
    header: "الصلاحية",
  },
  {
    accessorKey: "isActive",
    header: "الحالة",
    cell: ({ row }) => {
      return row.getValue("isActive") ? (
        <div className="text-right text-green-color">نشط</div>
      ) : (
        <div className="text-right text-title-dark">محظور</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الإنشاء",
    cell: ({ row }) => {
      const result = new Intl.DateTimeFormat("ar").format(
        new Date(row.getValue("createdAt"))
      );
      return <div className="text-right">{result}</div>;
    },
  },
  {
    accessorKey: "details",
    header: "تفاصيل",
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <NavLink to={`/users/user_details/${id}`}>
          <div className="text-right text-[15px] text-green-color underline hover:text-orange-color">
            تفاصيل
          </div>
        </NavLink>
      );
    },
  },
];
