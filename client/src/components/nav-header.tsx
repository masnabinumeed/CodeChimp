import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function NavHeader() {
  const [location] = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm border-b border-white/10" />

      <nav className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        <Link href="/">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-200" />
            <span className="relative text-2xl font-bold text-white">
              Tech Monkeys
            </span>
          </motion.div>
        </Link>

        <div className="flex gap-8">
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Projects" },
            { href: "/contact", label: "Contact" }
          ].map((link) => (
            <NavLink 
              key={link.href} 
              href={link.href} 
              active={location === link.href}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href}>
      <motion.span 
        whileHover={{ y: -2 }}
        className={cn(
          "relative text-sm font-medium cursor-pointer",
          "before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left",
          "before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300",
          "before:bg-gradient-to-r before:from-primary before:to-purple-400",
          active 
            ? "text-white before:scale-x-100" 
            : "text-gray-400 hover:text-white transition-colors duration-300"
        )}
      >
        {children}
      </motion.span>
    </Link>
  );
}