import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import styles from "./AppShell.module.css";

const onboardingRoutes = new Set([
  "/signup",
  "/how-it-works",
  "/waiver",
  "/avatar",
]);

function getTheme(pathname: string) {
  if (pathname === "/scan") {
    return styles.scanGlow;
  }

  if (pathname.startsWith("/rooms") || pathname.startsWith("/room")) {
    return styles.roomsGlow;
  }

  if (pathname === "/rewards" || pathname === "/leaderboard") {
    return styles.rewardsGlow;
  }

  return styles.homeGlow;
}

export default function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const showBottomNav = !onboardingRoutes.has(location.pathname);

  return (
    <div className={styles.pageChrome}>
      <div className={`${styles.phoneFrame} ${getTheme(location.pathname)}`}>
        <div className={styles.backdrop} />
        <div className={styles.noise} />
        <main className={`${styles.main} ${showBottomNav ? styles.withNav : ""}`}>
          {children}
        </main>
        {showBottomNav ? <BottomNav /> : null}
      </div>
    </div>
  );
}
