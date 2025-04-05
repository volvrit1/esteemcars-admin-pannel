"use client";

import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { tabs } from "../../data/tabs";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { token, user, logout } = useAuth();
  const [list, showList] = useState<any>({ tab: "", list: [] });

  if (!token) return null;

  // const userPermissions = user?.permissions;
  const userPermissions = [
    {
      module: "Dashboard",
      access: {
        read: true,
        write: true,
        delete: true,
      },
    },
    {
      module: "Manage Contacts",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Applications",
      access: {
        read: true,
        write: true,
        delete: true,
      },
    },
    {
      module: "Manage Leads",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Leads Status",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
        updateLeadsStatus: true,
      },
    },
    {
      module: "Manage Call",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Loan",
      access: {
        read: true,
        write: true,
        update: true,
        delete: true,
        updateStatus: true,
      },
    },
    {
      module: "Manage Loan Status",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
        updateStatus: true,
      },
    },
    {
      module: "Manage Newsletter",
      access: {
        read: true,
        write: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Testimonials",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Testimonials",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Blogs",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Users",
      access: {
        read: true,
        write: true,
        // create: true,
        // update: true,
        delete: true,
      },
    },
    {
      module: "Manage Faqs",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Banners",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
    {
      module: "Manage Sections",
      access: {
        read: true,
        write: true,
        create: true,
        update: true,
        delete: true,
      },
    },
  ];

  let filteredTabs: any = [];
  if (userPermissions && userPermissions.length > 0) {
    filteredTabs = tabs.filter((tab) =>
      userPermissions.some(
        (permission: any) =>
          permission?.module === tab.permission && permission?.access?.read
      )
    );
  }

return (
    <div
      className={`fixed w-[17%] text-white bg-primary h-full overflow-y-scroll no-scrollbar`}
    >
      <div className="flex justify-center border-b border-b-secondary bg-primary w-[17%] items-center py-[11px] fixed top-0">
        <Link href={""}>
          {/* <Image
            priority
            width={150}
            height={50}
            alt="Unfazed_Logo"
            unoptimized
            src={"/assets/logo/logo.jpg"}
          /> */}
          <h1 className="text-3xl">Esteem Finance</h1>
        </Link>
      </div>
      <nav className="flex flex-col gap-2 justify-center items-center mt-[72px] mb-40">
        {filteredTabs.map((tab: any) => {
          const Icon = tab.icon;
          return (
            <React.Fragment key={tab?.id}>
              <Link
                href={tab?.href}
                aria-label={tab?.label}
                onClick={() => {
                  if (list?.list.length > 0 && list?.tab === tab?.permission)
                    return showList({ tab: "", list: [] });
                  if (tab?.tabs && tab?.tabs.length > 0)
                    showList({ tab: tab?.permission, list: tab?.tabs });
                }}
                className={`py-3 pl-5 mr-auto w-[95%] pr-2 text-sm cursor-pointer hover:bg-secondary transition rounded-r-full text-info flex justify-between gap-2 items-center border-primary hover:text-white ${
                  pathname === tab?.href &&
                  "bg-white/20 rounded-r-full text-white font-semibold"
                }`}
              >
                <span className="flex gap-2 items-center">
                  <Icon size={18} /> {tab?.label}
                </span>
                {tab?.tabs && tab?.tabs.length > 0 && (
                  <RiArrowDropDownLine size={23} className="w-fit" />
                )}
              </Link>
              {list?.tab === tab?.permission && (
                <div
                  onMouseEnter={() =>
                    showList({ tab: tab?.permission, list: tab?.tabs })
                  }
                  className="flex flex-col w-full bg-secondary"
                >
                  {list?.list &&
                    list?.list.length > 0 &&
                    list?.list.map((tabChild: any, index: number) => {
                      const Icon = tabChild.icon;
                      return (
                        <Link
                          href={tabChild?.href}
                          key={`index+${index}`}
                          aria-label={tabChild?.label}
                          className="w-full text-xs text-info pl-7 gap-2 py-3 flex items-center hover:bg-white/20 hover:text-white"
                        >
                          <Icon className="text-base" /> {tabChild?.label}
                        </Link>
                      );
                    })}
                </div>
              )}
            </React.Fragment>
          );
        })}
        <button
          onClick={logout}
          className={`py-3 pl-5 mr-auto w-[95%] pr-2 text-sm cursor-pointer hover:bg-secondary transition rounded-r-full text-info flex justify-startd gap-2 items-center border-primary hover:text-white`}
        >
          <CiLogout /> Log Out
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
