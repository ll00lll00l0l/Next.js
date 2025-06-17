"use client";
import { useTheme } from 'next-themes';
import { IoMdSunny } from "react-icons/io";
import { RxMoon } from "react-icons/rx";

function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const dark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(dark ? 'light' : 'dark');
  };

  if (typeof window === 'undefined') return null;

  return (
    <button
      onClick={ toggleTheme }
      className=" "
    >
      { dark ? <IoMdSunny  size={20}/>
 : <RxMoon  size={20}/> }
    </button>
  );
}

export default ThemeSwitch;
