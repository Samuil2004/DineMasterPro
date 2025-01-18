import React from "react";
import { NavLink } from "react-router-dom";
import { useUserRole } from "../../hooks/useHeaderNav";
import { useNavigate } from "react-router-dom";
import { userErrorNavigation } from "../../hooks/useHeaderNav";
const DynamicNavLink = ({ to, children, className = "" }) => {
  const navigate = useNavigate();

  const { default: defaultPath, roles } = to;
  const getNavPath = () => {
    return useUserRole(
      defaultPath, //the default path
      Object.keys(roles)[0], //the laternative path
      Object.values(roles)[0] //which roles can go for the alternative path
    );
  };

  return (
    <>
      <NavLink
        to={getNavPath()}
        className={className}
        onClick={() => {
          navigate(userErrorNavigation());
        }}
      >
        {children}
      </NavLink>
    </>
  );
};

export default DynamicNavLink;
