import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { NavHeader } from "@/components/nav-header";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import MediaManager from "@/pages/admin/media";
import ProjectManager from "@/pages/admin/projects";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/media" component={MediaManager} />
      <Route path="/admin/projects" component={ProjectManager} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavHeader />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;