import React, { useEffect, useState } from "react";
import tag from "/images/icons/nav/tag.svg";
import orders from "/images/icons/nav/orders.svg";
import wallet from "/images/icons/nav/ewallet.svg";
import setting from "/images/icons/nav/setting.svg";
import tagFill from "/images/icons/nav/active-icon/tag.svg";
import ordersFill from "/images/icons/nav/active-icon/orders.svg";
import walletFill from "/images/icons/nav/active-icon/ewallet.svg";
import settingFill from "/images/icons/nav/active-icon/setting.svg";
import Load from "../Load";

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useCore } from "../../context/auth";

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

    useEffect(() => {
      if (loc.pathname === "/admin") {
        window.location.assign("/admin/products");
      } else if (loc.pathname === "/admin/") {
        window.location.assign("/admin/products");
      }
    }, [loc]);

    if (willHide) return;
    return (
      <div className="sticky bottom-0 left-0 w-full rounded-t-3xl px-4 bg-white shadow-slate-800 shadow-xl">
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
  const navi = useNavigate();
  const { isVendor, loading } = useCore();
  const { user } = useAuth();
  useEffect(() => {
    if (!loading) {
      if (isVendor === false) {
        navi("/dashboard", {
          state: {
            adminError: "You are not a vendor user",
          },
        });
      } else console.log("ami vendor");
    }
  }, [isVendor, loading]);
  if (!loading)
    return (
      <div className="bg-bg-gray relative w-full h-screen overflow-y-auto">
        <Outlet context={{ user: user }} />
        {loading && <Load />}
        <AdminNav />
      </div>
    );
}

export default AdminPage;
