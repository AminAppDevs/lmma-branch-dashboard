export const hasPermissionMethod = (
  useUserDetailsStore: any,
  permissionValue: string
) => {
  return useUserDetailsStore?.userDetails?.isSuperAdmin
    ? true
    : useUserDetailsStore.roleDetails?.permissions?.some(
        (permission: any) => permission.value === permissionValue
      );
};
