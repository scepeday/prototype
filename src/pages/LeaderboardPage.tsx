import { useState } from "react";
import ScreenHeader from "../components/ui/ScreenHeader";
import { leaderboardSeed } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import type { LeaderboardEntry } from "../types";
import styles from "../styles/screen.module.css";

type Filter = "Weekly" | "All Time" | "Friends";

function buildEntries(filter: Filter, state: ReturnType<typeof useAppState>["state"]) {
  let entries = [...leaderboardSeed];

  if (filter === "Weekly") {
    entries = entries.map((entry) => ({
      ...entry,
      xp: Math.round(entry.xp * 0.34),
      streak: Math.min(entry.streak, 4),
    }));
  }

  if (filter === "Friends") {
    entries = entries.filter((entry) => entry.isFriend);
  }

  const currentUser: LeaderboardEntry = {
    id: "current-user",
    name: state.user?.fullName ?? "Current Player",
    xp: filter === "Weekly" ? state.stats.xp : state.stats.xp,
    badges: state.earnedBadgeIds.length,
    streak: Math.max(1, state.stats.scanCount),
    accent: "lime",
    isFriend: true,
  };

  return [...entries, currentUser].sort((left, right) => right.xp - left.xp);
}

export default function LeaderboardPage() {
  const { state } = useAppState();
  const [filter, setFilter] = useState<Filter>("Weekly");
  const entries = buildEntries(filter, state);
  const podium = entries.slice(0, 3);
  const list = entries.slice(3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Leaderboard"
          title="Climb the standings"
          description="Weekly, all-time, and friend-based filters give the prototype a believable competitive frame without requiring any backend data."
        />
      </section>

      <section className={styles.tabs}>
        {(["Weekly", "All Time", "Friends"] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={`${styles.tab} ${filter === item ? styles.tabActive : ""}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </section>

      <section className={styles.topThree}>
        {podium.map((entry, index) => (
          <article
            key={entry.id}
            className={`${styles.podiumCard} ${
              index === 0
                ? styles.podiumFirst
                : index === 1
                  ? styles.podiumSecond
                  : styles.podiumThird
            } ${entry.name === state.user?.fullName ? styles.currentUser : ""}`}
          >
            <p className={styles.rank}>Rank {index + 1}</p>
            <strong className={styles.rankValue}>{entry.name}</strong>
            <p className={styles.itemMeta}>{entry.xp} XP</p>
            <p className={styles.itemMeta}>{entry.badges} badges</p>
          </article>
        ))}
      </section>

      <section className={styles.card}>
        <div className={styles.tableList}>
          {list.map((entry, index) => (
            <article
              key={entry.id}
              className={`${styles.tableRow} ${
                entry.name === state.user?.fullName ? styles.currentUser : ""
              }`}
            >
              <div className={styles.avatarBadge}>{index + 4}</div>
              <div>
                <h2 className={styles.itemTitle}>{entry.name}</h2>
                <p className={styles.itemMeta}>
                  {entry.badges} badges · {entry.streak} streak
                </p>
              </div>
              <strong className={styles.itemTitle}>{entry.xp} XP</strong>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
