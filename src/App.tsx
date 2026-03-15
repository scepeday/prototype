import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import { AppStateProvider, useAppState } from "./context/AppStateContext";
import CreateRoomPage from "./pages/CreateRoomPage";
import DashboardPage from "./pages/DashboardPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import MissionsPage from "./pages/MissionsPage";
import ProfilePage from "./pages/ProfilePage";
import RewardsPage from "./pages/RewardsPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import RoomsPage from "./pages/RoomsPage";
import ScanPage from "./pages/ScanPage";
import SignUpPage from "./pages/SignUpPage";
import AvatarPage from "./pages/AvatarPage";
import WaiverPage from "./pages/WaiverPage";

function resolveRedirect(pathname: string, avatarCreated: boolean) {
  const routeOrder = [
    "/signup",
    "/how-it-works",
    "/waiver",
    "/avatar",
  ] as const;

  if (pathname === "/") {
    return "/signup";
  }

  if (!avatarCreated && !routeOrder.includes(pathname as (typeof routeOrder)[number])) {
    return "/signup";
  }

  return null;
}

function FlowGuard() {
  const { state } = useAppState();
  const location = useLocation();

  if (location.pathname === "/how-it-works" && !state.onboarding.signupComplete) {
    return <Navigate to="/signup" replace />;
  }

  if (location.pathname === "/waiver") {
    if (!state.onboarding.signupComplete) {
      return <Navigate to="/signup" replace />;
    }

    if (!state.onboarding.howItWorksComplete) {
      return <Navigate to="/how-it-works" replace />;
    }
  }

  if (location.pathname === "/avatar") {
    if (!state.onboarding.signupComplete) {
      return <Navigate to="/signup" replace />;
    }

    if (!state.onboarding.howItWorksComplete) {
      return <Navigate to="/how-it-works" replace />;
    }

    if (!state.onboarding.waiverAccepted) {
      return <Navigate to="/waiver" replace />;
    }
  }

  const genericRedirect = resolveRedirect(
    location.pathname,
    state.onboarding.avatarCreated,
  );

  if (genericRedirect && genericRedirect !== location.pathname) {
    return <Navigate to={genericRedirect} replace />;
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/waiver" element={<WaiverPage />} />
        <Route path="/avatar" element={<AvatarPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/room/:id" element={<RoomDetailPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <FlowGuard />
      </HashRouter>
    </AppStateProvider>
  );
}
