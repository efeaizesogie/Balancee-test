import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ key, link, menu, icon, isActive }) => {
  return (
    <li key={key}>
      <Link
        to={link}
        class={`flex items-center text-sm lg:text-md my-1 px-4 py-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          isActive ? "bg-[#e6f1f6] text-primary" : ""
        }`}
      >
        {icon}
        <span class="ms-3">{menu}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
