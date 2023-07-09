import { ColumnDef } from "@tanstack/react-table";
import { NavLink } from "react-router-dom";
import { FcFlashOn, FcClock, FcCheckmark } from "react-icons/fc";

export type JoinStoreType = {
  id: string;
  name: number;
  logo: string;
  status: string;
  categoryIcon: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export const getStoreJoinRequestTableData = (data: any) => {
  console.log(data);
  const result: JoinStoreType[] = data?.map((value: any) => {
    return {
      id: value.id,
      name_logo: { name: value.name, logo: value.logo },
      category: { name: value.category, icon: value.categoryIcon },
      logo: value.logo,
      status: value.status,
      createdAt: value.createdAt,
      updatedAt: value.updatedAt,
    };
  });
  return result;
};

export const joinStoresColumns: ColumnDef<JoinStoreType>[] = [
  {
    accessorKey: "name_logo",
    header: "الأسرة المنتجة",
    cell: ({ row }: any) => {
      return (
        <div className="flex gap-2 items-center p-0">
          <img
            src={row.getValue("name_logo")?.logo}
            alt=""
            className="w-[40px] h-[40px] rounded-lg"
          />
          <h3>{row.getValue("name_logo")?.name}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "تاريخ الطلب",
    cell: ({ row }) => {
      const result = new Intl.DateTimeFormat("ar", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(row.getValue("createdAt")));
      return <div className="text-right">{result}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "القسم",
    cell: ({ row }: any) => {
      return (
        <div className="flex gap-2 items-center p-0">
          <img
            src={row.getValue("category")?.icon}
            alt=""
            className="w-[20px] h-[20px] rounded-lg"
          />
          <h3>{row.getValue("category")?.name}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "الحالة",
    cell: ({ row }) => {
      let val = null;
      switch (row.getValue("status")) {
        case "PENDING":
          val = (
            <div className="flex items-center">
              <FcFlashOn />
              <h3>جديد - بحاجة لمراجعتك</h3>
            </div>
          );
          break;
        case "NEEDUPDATE":
          val = (
            <div className="flex items-center gap-1">
              <FcClock />
              <h3>بإنتظار التعديلات من الأسرة المنتجة</h3>
            </div>
          );

          break;
        case "AFTERUPDATE":
          val = (
            <div className="flex items-center gap-1">
              <FcCheckmark />
              <h3>تمت التعديلات - بحاجة لمراجعتك</h3>
            </div>
          );
          break;

        default:
          val = <h3 className="text-[#F5A225]">طلب معدل</h3>;
          break;
      }
      return val;
    },
  },

  {
    accessorKey: "status",
    header: "النوع",
    cell: ({ row }) => {
      let val = null;
      switch (row.getValue("status")) {
        case "PENDING":
          val = <h3 className="text-[#1595DB]">طلب جديد</h3>;
          break;

        default:
          val = <h3 className="text-[#F5A225]">طلب معدل</h3>;
          break;
      }
      return val;
    },
  },

  {
    accessorKey: "updatedAt",
    header: "آخر تحديث",
    cell: ({ row }) => {
      const result = new Intl.DateTimeFormat("ar", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(row.getValue("updatedAt")));
      return <div className="text-right">{result}</div>;
    },
  },
  {
    accessorKey: "id",
    header: "تفاصيل",
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <NavLink to={`/stores/join_request/${id}`}>
          <div className="text-right text-[15px] text-green-color underline hover:text-orange-color">
            مراجعة الطلب
          </div>
        </NavLink>
      );
    },
  },
];
