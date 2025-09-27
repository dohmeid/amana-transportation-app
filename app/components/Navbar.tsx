'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuLinks = [
  { href: '/#map', label: 'Live Map' },
  { href: '/#schedule', label: 'Schedule' },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-red-500 border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/icons/amana-logo.png" width="200" alt="Amana Logo" />
        </a>

        <div className="flex items-center space-x-8">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-3 rounded-md text-sm font-medium transition-colors 
                        ${pathname === link.href
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
