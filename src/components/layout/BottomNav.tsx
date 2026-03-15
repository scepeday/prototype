import { Link, useLocation } from "react-router-dom";
import styles from "./BottomNav.module.css";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20H4z" />
      <path d="M9.5 20v-5h5v5" />
    </svg>
  );
}

function MissionIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 20 8.5v7L12 20 4 15.5v-7z" />
      <path d="m9.5 12 1.8 1.8L15 10.2" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4H4v3" />
      <path d="M17 4h3v3" />
      <path d="M4 17v3h3" />
      <path d="M20 17v3h-3" />
      <path d="M9 12h6" />
      <path d="M12 9v6" />
    </svg>
  );
}

function RoomIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
      <path d="M6 19a6 6 0 0 1 12 0" />
      <path d="M5 9.5a2 2 0 1 0 0-4" />
      <path d="M19 9.5a2 2 0 1 1 0-4" />
    </svg>
  );
}

function RewardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 14 9l5.5.4-4.2 3.6 1.3 5.4L12 15.6 7.4 18.4l1.3-5.4L4.5 9.4 10 9z" />
    </svg>
  );
}

const navItems = [
  {
    label: "Home",
    path: "/dashboard",
    matches: (pathname: string) => pathname === "/dashboard",
    icon: HomeIcon,
  },
  {
    label: "Missions",
    path: "/missions",
    matches: (pathname: string) => pathname.startsWith("/missions"),
    icon: MissionIcon,
  },
  {
    label: "Scan",
    path: "/scan",
    matches: (pathname: string) => pathname.startsWith("/scan"),
    icon: ScanIcon,
  },
  {
    label: "Rooms",
    path: "/rooms",
    matches: (pathname: string) =>
      pathname.startsWith("/rooms") ||
      pathname.startsWith("/room/") ||
      pathname.startsWith("/create-room"),
    icon: RoomIcon,
  },
  {
    label: "Rewards",
    path: "/rewards",
    matches: (pathname: string) =>
      pathname.startsWith("/rewards") ||
      pathname.startsWith("/leaderboard") ||
      pathname.startsWith("/profile"),
    icon: RewardIcon,
  },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className={styles.nav} aria-label="Primary">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.matches(location.pathname);

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
          >
            <span className={styles.iconWrap}>
              <Icon />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
