import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function NavHeader() {
  const [location] = useLocation();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur z-50 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold text-primary hover:opacity-80 cursor-pointer">
            Tech Monkeys
          </span>
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
    </header>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href}>
      <span className={cn(
        "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
        active ? "text-primary" : "text-muted-foreground"
      )}>
        {children}
      </span>
    </Link>
  );
}