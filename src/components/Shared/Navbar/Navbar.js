import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-4 w-full bg-gray-200 flex justify-between">
      <div className="text-2xl font-bold px-24">
        <h1>Shahriar Hasan</h1>
      </div>
      <div className="flex gap-6 items-center font-semibold px-24">
        <Link className="hover:scale-[1.18] transition duration-100" href='/'>Home</Link>
        <Link className="hover:scale-[1.18] transition duration-100" href='/skills'>Skills</Link>
        <Link className="hover:scale-[1.18] transition duration-100" href='/services'>Services</Link>
        <Link className="hover:scale-[1.18] transition duration-100" href='/projects'>Projects</Link>
        <Link className="hover:scale-[1.18] transition duration-100" href='/about'>About</Link>
        <Link className="hover:scale-[1.18] transition duration-100" href='/contact'>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;