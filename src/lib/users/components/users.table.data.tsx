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
    header: "رقم",
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
    header: "اسم الموظف",
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
        <div className="text-right font-medium text-green-color">نشط</div>
      ) : (
        <div className="text-right font-medium text-title-dark">محظور</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الإنشاء",
  },
  {
    accessorKey: "details",
    header: "تفاصيل",
    cell: () => {
      return (
        <NavLink to={"/"}>
          <div className="text-right font-medium text-green-color underline hover:text-orange-color">
            عرض التفاصيل
          </div>
        </NavLink>
      );
    },
  },
];
