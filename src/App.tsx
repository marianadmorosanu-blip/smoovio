import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/i18n/LocaleContext";
import type { UserSelections } from "@/types";

// Layouts
import AppLayout from "./layouts/AppLayout";
import FocusedFlowLayout from "./layouts/FocusedFlowLayout";
import MarketingLayout from "./layouts/MarketingLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import IngredientsPage from "./pages/IngredientsPage";
import GoalPage from "./pages/GoalPage";
import TastePage from "./pages/TastePage";
import ResultsPage from "./pages/ResultsPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import AdminPage from "./pages/AdminPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SmoviooDesignSystem from "./pages/SmoviooDesignSystem";
import SmoviooAppPreview from "./pages/SmoviooAppPreview";
import ExplorePage from "./pages/ExplorePage";
import GoalsBrowsePage from "./pages/GoalsBrowsePage";
import CreateFlowPage from "./pages/CreateFlowPage";
import SleepPage from "./pages/SleepPage";
import SleepRecipeDetailPage from "./pages/SleepRecipeDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [selections, setSelections] = useState<UserSelections>({
    ingredients: [],
    healthGoal: null,
    tastes: [],
    childFriendly: false,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Marketing / Landing */}
              <Route element={<MarketingLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
              </Route>

              {/* Main app with bottom nav */}
              <Route path="/app" element={<AppLayout />}>
                <Route path="home" element={<HomePage />} />
                <Route path="explore" element={<ExplorePage />} />
                <Route path="goals" element={<GoalsBrowsePage />} />
                <Route path="recipe/:id" element={<RecipeDetailPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="profile" element={<ProfileSettingsPage />} />
                <Route path="results" element={<ResultsPage selections={selections} />} />
                <Route path="sleep" element={<SleepPage />} />
                <Route path="sleep/:id" element={<SleepRecipeDetailPage />} />
              </Route>

              {/* Focused flow (no bottom nav) */}
              <Route element={<FocusedFlowLayout />}>
                <Route path="/app/create" element={<CreateFlowPage />} />
                <Route
                  path="/ingredients"
                  element={
                    <IngredientsPage
                      selected={selections.ingredients}
                      onSelect={(ids) => setSelections((s) => ({ ...s, ingredients: ids }))}
                    />
                  }
                />
                <Route
                  path="/goal"
                  element={
                    <GoalPage
                      selected={selections.healthGoal}
                      onSelect={(id) => setSelections((s) => ({ ...s, healthGoal: id }))}
                    />
                  }
                />
                <Route
                  path="/taste"
                  element={
                    <TastePage
                      selected={selections.tastes}
                      onSelect={(ids) => setSelections((s) => ({ ...s, tastes: ids }))}
                      childFriendly={selections.childFriendly}
                      onChildFriendlyChange={(val) => setSelections((s) => ({ ...s, childFriendly: val }))}
                    />
                  }
                />
              </Route>

              {/* Admin / Design System */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/design-system" element={<SmoviooDesignSystem />} />
              <Route path="/app-preview" element={<SmoviooAppPreview />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
};

export default App;
