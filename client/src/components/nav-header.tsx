import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function NavHeader() {
  const [location] = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed inset-x-0 top-8 w-fit z-50 mx-auto"
    >
      <nav className="container mx-auto px-8 h-16 flex items-center justify-between relative gap-8 bg-secondary/20 border-secondary/20 border-1 backdrop-blur-md rounded-full">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative group cursor-pointer font-display font-bold uppercase text-lg"
          >
            CodeChimp
          </motion.div>
        </Link>

        <div className="flex gap-8 items-center">
          {[
            { href: "/", label: "Home" },
            { href: "", label: "Projects" },
            { href: "", label: "Contact" },
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

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ y: -2 }}
        className={cn(
          "relative font-medium cursor-pointer",
          "before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left",
          "before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300",
          "before:bg-gradient-to-r before:from-primary before:to-secondary",
          active
            ? "text-white before:scale-x-100"
            : "transition-colors duration-300",
        )}
      >
        {children}
      </motion.span>
    </Link>
  );
}
