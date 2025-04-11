import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import VendorsPage from "./pages/VendorsPage";
import VendorProfilePage from "./pages/VendorProfilePage";
import RequestInfoPage from "./pages/RequestInfoPage";
import ClientListPage from "./pages/ClientListPage";
import AuthPage from "./pages/AuthPage";
import CompleteProfilePage from "./pages/CompleteProfliePage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/vendors" component={VendorsPage} />
            <Route path="/vendors/:id" component={VendorProfilePage} />
            <Route path="/request-info/:id?" component={RequestInfoPage} />
            <Route path="/clients" component={ClientListPage} />
            <Route path="/auth/:type" component={AuthPage} />
            <Route path="/complete-profile" component={CompleteProfilePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
