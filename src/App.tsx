
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-950">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/search" element={<div className="pt-12 pb-20 px-4"><h1 className="text-2xl font-bold text-white">Search Page</h1><p className="text-gray-400 mt-2">Coming soon...</p></div>} />
              <Route path="/library" element={<div className="pt-12 pb-20 px-4"><h1 className="text-2xl font-bold text-white">Your Library</h1><p className="text-gray-400 mt-2">Your saved books will appear here</p></div>} />
              <Route path="/profile" element={<div className="pt-12 pb-20 px-4"><h1 className="text-2xl font-bold text-white">Profile</h1><p className="text-gray-400 mt-2">Manage your account</p></div>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNavigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
