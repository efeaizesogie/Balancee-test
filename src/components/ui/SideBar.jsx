import React from "react";
import UserProfile from "./UserProfile";
import MenuIcon from "./MenuIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";
import Logo from "./logo";

const SideBar = ({ mobileNav, setMobileMenuOpen }) => {
  const location = useLocation();
  const MENU = [
    {
      menu: "Dashboard",
      icon: <MenuIcon />,
      link: "/dashboard",
    },
    {
      menu: "Rewards",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-money-bill"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),
      link: "/",
    },
    {
      menu: "Book a Repair",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-gears"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),

      link: "/book-repair",
    },
    {
      menu: "Appointments",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-calendar-check"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),
      link: "/appointment",
    },
    {
      menu: "My Vehicles",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-car"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),
      link: "/my-vehicles",
    },
    {
      menu: "Repair History",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-clock-rotate-left"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),
      link: "/repair-history",
    },

    {
      menu: "Repair Stations",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-toolbox"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),
      link: "/repair-stations",
    },
    {
      menu: "Newsletter",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-envelopes-bulk"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),
      link: "/newsletter",
    },
    {
      menu: "Support",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-headset"
          size="xl"
          style={{ color: "rgb(89 89 89)" }}
        />
      ),
      link: "/support",
    },
    {
      menu: "Log Out",
      icon: (
        <FontAwesomeIcon
          icon="fa-solid fa-right-from-bracket"
          size="xl"
          style={{ color: "#d12115" }}
        />
      ),
      link: "/logout",
    },
  ];

  return (
    <>
      {!mobileNav ? (
        <aside
          id="logo-sidebar"
          class="fixed top-0 left-0 z-40 w-72 h-screen px-5 lg:px-10 pt-20 transition-transform -translate-x-full bg-white border-r border-neutral-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <UserProfile />

          <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
              {MENU.map((item) => (
                <MenuItem
                  key={item.menu}
                  menu={item.menu}
                  icon={item.icon}
                  link={item.link}
                  isActive={location.pathname === item.link}
                />
              ))}
            </ul>
          </div>
        </aside>
      ) : (
        <div className="relative">
          <aside
            id="logo-sidebar"
            class="fixed top-0 left-0 z-40 w-72 overflow-x-scroll h-screen px-5 lg:px-10 pt-5 transition-transform -translate-x-0 bg-white border-r border-neutral-200  dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
          >
            <div className=" flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={setMobileMenuOpen}
                className="rounded-md p-2.5 text-gray-700 dark:text-white"
              >
                <span className="sr-only">Close menu</span>
                <FontAwesomeIcon icon="fa-solid fa-xmark" />
              </button>
            </div>

            <UserProfile />

            <div class="h-full  px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul class="space-y-2 font-medium">
                {MENU.map((item) => (
                  <MenuItem
                    key={item.menu}
                    menu={item.menu}
                    icon={item.icon}
                    link={item.link}
                    isActive={location.pathname === item.link}
                  />
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default SideBar;
