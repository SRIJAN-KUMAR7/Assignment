import React from "react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-#263340 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="pl-4 pr-4">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="font-mono text-xl font-bold text-white">
            Assignment
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#add" className="text-gray-300 hover:text-white transition-colors text-center">
              Add Item
            </a>
            <a href="#view" className="text-gray-300 hover:text-white transition-colors text-center">
              View Items
            </a>
          </div>
          <div className="md:hidden text-white text-2xl cursor-pointer">
            &#9776;
          </div>
        </div>
      </div>
    </nav>
  );
};