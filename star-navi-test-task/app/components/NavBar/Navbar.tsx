import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-neutral-950">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div>
            <Link
              className="text-yellow-500 hover:text-green-500"
              href="/"
              passHref
            >
              Home
            </Link>
          </div>

          <div>
            <Link
              className="text-yellow-500 hover:text-blue-500"
              href="/starwars"
              passHref
            >
              Star-Wars
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
