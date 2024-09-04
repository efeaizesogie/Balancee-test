import React from "react";
import Logo from "./ui/logo";
import RewardsSummary from "./RewardsSummary";

import { Outlet } from "react-router-dom";
import { Dialog } from "@radix-ui/react-dialog";
import SideBar from "./ui/SideBar";

const Layout = () => {
  return (
    <div>
      <nav class="fixed top-0 z-50 left-0 w-full bg-white shadow-[0px_1px_2px_#D9D9D9] dark:bg-gray-800 dark:border-gray-700">
        <div class="px-7 py-3 lg:px-12 ">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <Logo />
            </div>
            <div className="flex gap-3">
              <div class="flex items-center">
                <div class="flex items-center ms-3">
                  <div>
                    <button
                      type="button"
                      class="flex text-sm rounded-full focus:ring-4"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span class="sr-only">Open user menu</span>
                      <div className="h-10 w-10 rounded-full bg-neutral-100 border-0  flex justify-center items-center">
                        <svg
                          class="h-5 w-5"
                          fill="#000000"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>

                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* 
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.src}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button className="text-lg font-semibold w-full h-12 rounded-full font-messina">
                  <Link to="/get-started">Create an account</Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog> */}

      <SideBar />

      <div class=" p-4 md:ml-64">
        <div class="p-4 rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
