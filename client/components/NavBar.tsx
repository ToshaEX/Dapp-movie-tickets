"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { routes, ownerAddress } from "@/constants";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";

interface Props {
  currentAccount: string;
}

const MobileNav = ({ currentAccount }: Props) => {
  const NavItems = [
    { label: "Movies", route: routes.MOVIES },
    { label: "My Tickets", route: routes.BOOKINGS },
  ];

  return (
    <div className="flex  flex-col justify-center items-center bg-teal-500   absolute left-0 right-0 top-20">
      {currentAccount === ownerAddress ? (
        <Link
          href={routes.CREATE_MOVIE}
          className="  text-teal-200 hover:text-white mr-4"
        >
          Add Movie
        </Link>
      ) : null}
      {NavItems.map((item, i) => (
        <Link
          key={`nav-item-${i}`}
          href={item.route}
          className="  text-teal-200 hover:text-white mr-4"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const DesktopNav = ({ currentAccount }: Props) => {
  const NavItems = [
    { label: "Home", route: routes.HOME },
    { label: "Movies", route: routes.MOVIES },
    { label: "My Tickets", route: routes.BOOKINGS },
  ];
  console.log(
    currentAccount.localeCompare(ownerAddress),
    currentAccount,
    ownerAddress
  );
  return (
    <div className="flex  flex-row justify-between items-center bg-teal-500  left-0 right-0">
      {currentAccount === ownerAddress ? (
        <Link
          href={routes.CREATE_MOVIE}
          className="  text-teal-200 hover:text-white mr-4"
        >
          Add Movie
        </Link>
      ) : null}
      {NavItems.map((item, i) => (
        <Link
          key={`nav-item-${i}`}
          href={item.route}
          className="  text-teal-200 hover:text-white mr-4"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

const NavBar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { isLoading, currentAccount } = useContext<any>(MovieTicketingContext);
  if (isLoading) return <div>Loading</div>;
  return (
    <>
      <nav className="flex items-center justify-between lg:justify-start flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
            Tailwind CSS
          </span>
        </div>
        <div className="hidden  lg:flex">
          <DesktopNav currentAccount={currentAccount} />
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </nav>
      {isVisible && <MobileNav currentAccount={currentAccount} />}
    </>
  );
};

export default NavBar;
