const filterNavItemBasedOnRoles = (item, userDetail) => {
  return item.roles.includes(userDetail.role);
};
export default filterNavItemBasedOnRoles;
