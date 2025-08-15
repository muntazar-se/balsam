import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  
  const [collapsed] = useState(false);
  const { user } = useSelector((state) => state.user) || {};

  const userName = user?.name; // Optional chaining for accessing nested properties

  console.log("User name:", userName); // Log the user name for debugging

  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?.user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    }
 
  ];

  const isAdmin = user?.user?.isAdmin;
  const isDoctor = user?.user?.isDoctor;
  const firstName = user?.user?.firstName;
  const lastName = user?.user?.lastName;
  const name = firstName + " " + lastName;
  const length = user?.user?.unseenNotifications?.length || 0;
  
  // Check if user is authenticated
  const isAuthenticated = !!user?.user;
  
  const role = isAuthenticated 
    ? (isAdmin ? "Admin" : isDoctor ? "Doctor" : "User")
    : "Guest";

  const menuToBeRendered = isAuthenticated
    ? (isAdmin ? adminMenu : isDoctor ? doctorMenu : userMenu)
    : []; // No menu for guests

  console.log("Menu to be rendered:", menuToBeRendered); // Add this line for debugging

  return (
    <div className="layout-container">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Balsam</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={menu.path}
                  className={`menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <Link to={menu.path}>
                    <i className={menu.icon}></i>
                    {!collapsed && <span>{menu.name}</span>}
                  </Link>
                </div>
              );
            })}
            {isAuthenticated && (
              <div
                className="menu-item"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <Link to="/login">
                  <i className="ri-logout-circle-line"></i>
                  {!collapsed && <span>Log out</span>}
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="content">
          <div className="header">
            <h1></h1>
            
            {isAuthenticated ? (
              <>
                <Badge
                  count={length}
                  onClick={() => navigate("/notifications")}
                >
                  <i className="ri-notification-line header-action-icon px-3"></i>
                </Badge>

                <div className="d-flex align-items-center px-4">
                  <Link className="anchor mx-2" to="/profile">
                    {name}
                  </Link>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center px-4">
                <Link className="anchor mx-2" to="/login">
                  Login
                </Link>
                <Link className="anchor mx-2" to="/register">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;