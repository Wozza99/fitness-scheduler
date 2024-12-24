"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm mx-auto">
        <div className="flex items-center gap-5 font-semibold">
          <Link href={"/"}>Fitness Scheduler</Link>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <Link href="/protected/calendar">Calendar</Link>
          <Link href="/protected/workouts">Workouts</Link>
          <Link href="/protected/exercises">Exercises</Link>
          <Link href="/protected/settings">Settings</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-5 p-3">
          <Link href="/calendar">Calendar</Link>
          <Link href="/workouts">Workouts</Link>
          <Link href="/exercises">Exercises</Link>
          <Link href="/settings">Settings</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;