import React, { useState } from "react";
import tag from "/images/icons/nav/tag.svg";
import orders from "/images/icons/nav/orders.svg";
import wallet from "/images/icons/nav/ewallet.svg";
import setting from "/images/icons/nav/setting.svg";
import tagFill from "/images/icons/nav/active-icon/tag.svg";
import ordersFill from "/images/icons/nav/active-icon/orders.svg";
import walletFill from "/images/icons/nav/active-icon/ewallet.svg";
import settingFill from "/images/icons/nav/active-icon/setting.svg";
import { NavLink, Outlet, useLocation } from "react-router-dom";
function AdminPage() {
  const AdminNav = () => {
    const links = [
      {
        icon: tag,
        iconF: tagFill,
        link: "products",
      },
      {
        icon: orders,
        iconF: ordersFill,
        link: "orders",
      },
      {
        icon: wallet,
        iconF: walletFill,
        link: "wallet",
      },
      {
        icon: setting,
        iconF: settingFill,
        link: "settings",
      },
    ];
    const loc = useLocation();
    const willHide = loc.pathname.includes("addproduct");

    const [activeId, setActiveID] = useState(-1);
    if(willHide) return;
    return (
      <div className="fixed bottom-0 left-0 w-screen rounded-t-3xl px-4 bg-white shadow-slate-800 shadow-xl">
        <ul className="grid grid-cols-4 gap-2 justify-center">
          {links.map((link, lid) => {
            return (
              <li
                key={lid}
                className="text-center py-4 hover:text-default-green group font-semibold capitalize relative"
              >
                <div
                  className={`absolute w-1/4 h-2 transition-colors rounded-full left-1/2 -translate-x-1/2 top-0 ${
                    lid == activeId && "bg-default-green"
                  }`}
                ></div>
                <NavLink
                  to={"/admin/" + link.link}
                  style={({ isActive }) => {
                    if (isActive) setActiveID(lid);
                    return isActive ? { color: "green" } : {};
                  }}
                >
                  <img
                    className="mx-auto group-hover:hidden block"
                    src={link.icon}
                    alt=""
                  />
                  <img
                    className="mx-auto group-hover:block hidden"
                    src={link.iconF}
                    alt=""
                  />
                  {link.link}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div className="bg-bg-gray w-full h-screen overflow-y-auto">
      <Outlet />
      <AdminNav />
    </div>
  );
}

export default AdminPage;
