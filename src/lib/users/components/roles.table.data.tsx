import { ColumnDef } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";

export type Role = {
  id: number;
  title: string;
  createdAt: string;
  branchAdminNumber: number;
  permissionsNumber: number;
};

export const getRolesTableData = (data: any) => {
  console.log(data);
  const result: Role[] = data?.map((value: any) => {
    console.log(value._count, "branchAdminNumber");
    return {
      id: `${value.id}#`,
      title: value.title,
      branchAdminNumber: value._count.branchAdmin,
      permissionsNumber: value._count.permissions,
      createdAt: value.createdAt,
    };
  });
  return result;
};

export const rolesColumns: ColumnDef<Role>[] = [
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
    accessorKey: "title",
    header: "اسم الصلاحية",
  },
  {
    accessorKey: "branchAdminNumber",
    header: "عدد الموظفين",
  },
  {
    accessorKey: "permissionsNumber",
    header: "خيارات الصلاحية",
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الإنشاء",
  },

  {
    accessorKey: "details",
    header: "تعديل",
    cell: () => {
      return (
        <NavLink to={"/"}>
          <div className="text-right font-medium text-green-color underline hover:text-orange-color">
            تعديل
          </div>
        </NavLink>
      );
    },
  },
];
