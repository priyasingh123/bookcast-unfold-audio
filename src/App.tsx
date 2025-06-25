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
import PlayerPage from "./pages/PlayerPage";
import LibraryPage from "./pages/LibraryPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDataPage from "./pages/admin/UserDataPage";
import AddBookPage from "./pages/admin/AddBookPage";
import NotificationPage from "./pages/admin/NotificationPage";
import InsightsPage from "./pages/admin/InsightsPage";
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
              <Route path="/player/:id" element={<PlayerPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserDataPage />} />
                <Route path="add-book" element={<AddBookPage />} />
                <Route path="notifications" element={<NotificationPage />} />
                <Route path="insights" element={<InsightsPage />} />
              </Route>
              
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
