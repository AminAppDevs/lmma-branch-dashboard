import {
  IoAnalyticsOutline,
  IoArchiveOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

export const handleIsPermissionExist = (
  isSuperAdmin: boolean,
  value: string,
  permissions: []
) => {
  console.log(isSuperAdmin);
  if (isSuperAdmin) {
    return true;
  } else {
    const permission = permissions?.find((perm: any) => {
      return perm.value === value;
    });
    return permission;
  }
};

export const handleSubMenuContainPremission = (
  isSuperAdmin: boolean,
  menuItemChildren: any,
  permissions: any
) => {
  const result = [];
  if (isSuperAdmin) {
    return true;
  } else {
    for (let i = 0; i < menuItemChildren?.length; i++) {
      const obj1 = menuItemChildren[i];
      const value1 = obj1?.permission;

      for (let j = 0; j < permissions?.length; j++) {
        const obj2 = permissions[j];
        const value2 = obj2?.value;

        if (value1 === value2) {
          result.push(1);
          return result.length > 0;
        }
      }
    }
  }
};

export const menuData = [
  {
    id: 1,
    title: "الرئيسية",
    icon: IoHomeOutline,
    path: "/",
    isSubmenu: false,
    permission: "view_home",
  },
  {
    id: 2,
    title: "المبيعات",
    icon: IoAnalyticsOutline,
    path: "/sales_orders/sales",
    isSubmenu: false,
    permission: "view_sales",
  },
  {
    id: 3,
    title: "الطلبات",
    icon: IoArchiveOutline,
    path: "/sales_orders/orders",
    isSubmenu: false,
    permission: "view_order",
  },
  {
    id: 4,
    title: "التنبيهات",
    icon: IoNotificationsOutline,
    path: "/notifications",
    isSubmenu: false,
    permission: "view_notifications",
  },
  {
    id: 5,
    title: "حسابك",
    icon: IoPersonOutline,
    path: "/sales_orders/orders",
    isSubmenu: false,
    permission: "view_orders",
  },
  {
    id: 6,
    title: "الموظفين",
    icon: IoPeopleOutline,
    path: "#",
    isSubmenu: true,
    permission: "",
    children: [
      {
        id: 7,
        title: "كل الموظفين",
        path: "/users/all_users",
        isSubmenu: false,
        permission: "view_employees",
      },
      {
        id: 8,
        title: "الصلاحيات",
        path: "/users/roles",
        isSubmenu: false,
        permission: "view_roles",
      },
      {
        id: 9,
        title: "أضف صلاحية جديدة",
        path: "/users/create_branch_role",
        isSubmenu: false,
        permission: "edit_roles",
      },
      {
        id: 10,
        title: "أضف مستخدم جديد",
        path: "/users/add_new_user",
        isSubmenu: false,
        permission: "edit_employees",
      },
    ],
  },
  {
    id: 11,
    title: "الأسر المنتجة",
    icon: IoStorefrontOutline,
    path: "#",
    isSubmenu: true,
    permission: "",
    children: [
      {
        id: 12,
        title: "طلبات الإنضمام",
        path: "/users/all_users",
        isSubmenu: false,
        permission: "aa",
      },
      {
        id: 13,
        title: "كل الأسر المنتجة",
        path: "/users/permissions",
        isSubmenu: false,
        permission: "aa",
      },
    ],
  },
];
