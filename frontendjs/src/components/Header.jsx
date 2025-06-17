import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  return (
    <header className="w-full bg-gray-100 py-4 shadow">
      <div className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-xl font-bold">My App</h1>
        <span className="relative z-10 text-black">
            <ThemeSwitch/>
            </span>
      </div>
    </header>
  );
}
