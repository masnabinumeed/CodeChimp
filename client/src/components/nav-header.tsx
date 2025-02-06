import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function NavHeader() {
  const [location] = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer"
          >
            Tech Monkeys
          </motion.span>
        </Link>

        <div className="flex gap-8">
          <NavLink href="/" active={location === "/"}>
            Home
          </NavLink>
          <NavLink href="/projects" active={location === "/projects"}>
            Projects
          </NavLink>
          <NavLink href="/contact" active={location === "/contact"}>
            Contact
          </NavLink>
        </div>
      </nav>
    </motion.header>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href}>
      <span className={cn(
        "relative text-sm font-medium transition-colors cursor-pointer",
        "before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left",
        "before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300",
        "before:bg-primary",
        active ? "text-primary before:scale-x-100" : "text-muted-foreground hover:text-primary"
      )}>
        {children}
      </span>
    </Link>
  );
}