"use client";

import { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Header from "./Header";
import { Toaster } from "sonner";

const Layout = ({ children }) => {
  const [scroll, setScroll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Aos.init({ duration: 800, once: true });

    if (typeof window !== "undefined") {
      const WOW = require("wowjs");
      new WOW.WOW({ live: false }).init();

      const handleScroll = () => {
        setScroll(window.scrollY > 100);
      };

      document.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return (
    <div className={`layout ${scroll ? "scrolled" : ""}`}>
      {loading && (
        <div className="loading-container flex justify-center items-center h-screen text-white">
          Loading...
        </div>
      )}
       <Toaster />
      {!loading && <>
      <Header/>
      {children}
      </>}
    </div>
  );
};

export default Layout;
