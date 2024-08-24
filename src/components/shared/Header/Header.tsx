import assets from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignJustify,
  ChevronRight,
  LogOut,
  ShoppingBagIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HeaderItems } from "./HeaderItem";
import { items } from "@/utils/item";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const user = null; // Replace with actual user fetching logic

  const handleLogout = () => {
    // Handle logout logic here
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubMenuClick = (key) => {
    navigate(`/products/${key}`);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 flex justify-center items-center h-16 ${
        scrolled
          ? "shadow-md border-b bg-white backdrop-blur-lg"
          : "bg-white border-b"
      }`}
    >
      <div className="container mx-auto">
        <header className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="lg:hidden">
                  <AlignJustify className="h-6 w-6" />
                  <span className="sr-only">Toggle Navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex items-center"
                >
                  <Link to="/">
                    <img
                      src={assets.images.logo}
                      alt="trendy"
                      className="h-[50px] w-[100px] mt-2 object-fill mr-4 rounded"
                    />
                  </Link>
                </motion.div>
                <div className="grid gap-2 py-6">
                  {/* <HeaderItemSheet/> */}
                  {items.map((item) => (
                    <span
                      key={item.key}
                      onClick={() => handleSubMenuClick(item.key)}
                    >
                      {item.key}
                    </span>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <motion.div
              className="hidden md:flex"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex-start">
                <Link to="/">
                  <img
                    src={assets.images.logo}
                    alt="trendy"
                    className="h-[50px] w-[100px] mt-2 object-fill mr-4 rounded"
                  />
                </Link>
              </div>
            </motion.div>
          </div>

          <nav className="hidden lg:flex gap-6">
            <HeaderItems />
          </nav>

          <div className="flex items-center gap-2">
            {/* <ModeToggle /> */}
            <ShoppingBagIcon />

            {user && user.userId ? (
              <Button
                onClick={handleLogout}
                asChild
                className="cursor-pointer group"
              >
                <span className="flex items-center gap-2">
                  Logout
                  <LogOut className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
                </span>
              </Button>
            ) : (
              <Button asChild className="group">
                <Link to="/signin" className="flex items-center gap-2">
                  Sign In
                  <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
