import React from "react";

const Logo = () => {
  return (
    <div class="w-24 md:w-32 h-auto header-img content-center items-center flex flex-row">
      <a aria-current="page" className="border-transparent active" href="/">
        <img
          src="data:image/png;base64,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"
          alt="balancee"
        />
      </a>
    </div>
  );
};

export default Logo;
