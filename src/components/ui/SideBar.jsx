import React from "react";
import UserProfile from "./UserProfile";
import MenuIcon from "./MenuIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuItem from "./MenuItem";

const SideBar = () => {
  const MENU = [
    {
      menu: "Dashboard",
      icon: <MenuIcon />,
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

      link: "/",
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
      link: "/",
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
      link: "/",
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
      link: "/",
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
      link: "/rewards",
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
      link: "/",
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
      link: "/",
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
      link: "/",
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
      link: "/",
    },
  ];

  return (
    <>
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
              />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
