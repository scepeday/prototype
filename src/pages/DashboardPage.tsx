import { Link } from "react-router-dom";
import AvatarPreview from "../components/avatar/AvatarPreview";
import ScreenHeader from "../components/ui/ScreenHeader";
import StatCard from "../components/ui/StatCard";
import { getReadinessPercentage, useAppState } from "../context/AppStateContext";
import { leaderboardSeed, missions } from "../data/mockData";
import styles from "../styles/screen.module.css";

export default function DashboardPage() {
  const { state } = useAppState();
  const readiness = getReadinessPercentage(state);
  const activeMission = missions[0];
  const firstName = state.user?.fullName.split(" ")[0] ?? "Challenger";
  const topPlayers = leaderboardSeed.slice(0, 3);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Dashboard"
          title={`Welcome back, ${firstName}`}
          description="Your challenge dashboard tracks readiness, live XP, room access, and fast links into the next arena step."
          action={
            <Link to="/profile" className={styles.avatarMini}>
              <AvatarPreview config={state.avatar} compact />
            </Link>
          }
        />
        <div className={styles.supportRow}>
          <span className={`${styles.supportPill} ${styles.pillLime}`}>Readiness {readiness}%</span>
          <span className={styles.supportPill}>Player unlocked</span>
        </div>
      </section>

      <section className={`${styles.card} ${styles.cardStrong}`}>
        <div className={styles.missionCardTop}>
          <div>
            <p className={`${styles.pill} ${styles.pillCyan}`}>Active Mission</p>
            <h2 className={styles.itemTitle}>{activeMission.title}</h2>
            <p className={styles.itemText}>{activeMission.description}</p>
          </div>
          <span className={`${styles.pill} ${styles.pillLime}`}>+{activeMission.xpReward} XP</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.pill}>{activeMission.zone}</span>
          <span className={styles.pill}>{activeMission.category}</span>
          <span className={styles.pill}>{activeMission.difficulty}</span>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <StatCard label="XP" value={String(state.stats.xp)} detail="Prototype score" tone="lime" />
        <StatCard
          label="Missions"
          value={String(state.stats.missionsCompleted)}
          detail="Completed scans"
          tone="cyan"
        />
        <StatCard
          label="Badges"
          value={String(state.earnedBadgeIds.length)}
          detail="Unlocked rewards"
          tone="coral"
        />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Quick actions</h2>
            <p className={styles.sectionLead}>Move between the core features from one home screen.</p>
          </div>
        </div>
        <div className={styles.quickActions}>
          <Link to="/missions" className={styles.actionTile}>
            <p className={styles.actionKicker}>Mission Board</p>
            <h3 className={styles.actionTitle}>Browse Missions</h3>
            <p className={styles.actionText}>See active XP runs and challenge categories.</p>
          </Link>
          <Link to="/scan" className={styles.actionTile}>
            <p className={styles.actionKicker}>Scanner</p>
            <h3 className={styles.actionTitle}>Scan to Discover</h3>
            <p className={styles.actionText}>Reveal mission completions and hidden rewards.</p>
          </Link>
          <Link to="/rooms" className={styles.actionTile}>
            <p className={styles.actionKicker}>Lobby</p>
            <h3 className={styles.actionTitle}>Find a Room</h3>
            <p className={styles.actionText}>Create or join a live challenge lineup.</p>
          </Link>
          <Link to="/rewards" className={styles.actionTile}>
            <p className={styles.actionKicker}>Rewards</p>
            <h3 className={styles.actionTitle}>Track Badges</h3>
            <p className={styles.actionText}>See progress toward the next unlock.</p>
          </Link>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Profile readiness</h2>
            <p className={styles.sectionLead}>Your onboarding completion fuels the first arena unlocks.</p>
          </div>
          <span className={`${styles.pill} ${styles.pillLime}`}>{readiness}% ready</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${readiness}%` }} />
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Recent activity</h2>
            <p className={styles.sectionLead}>A prototype-safe log of your latest challenge actions.</p>
          </div>
        </div>
        <div className={styles.list}>
          {state.recentActivity.length > 0 ? (
            state.recentActivity.map((activity) => (
              <article key={activity.id} className={styles.listItem}>
                <div className={styles.activityItem}>
                  <span className={`${styles.activityDot} ${styles[`${activity.tone}Tone`]}`} />
                  <div>
                    <h3 className={styles.itemTitle}>{activity.title}</h3>
                    <p className={styles.itemText}>{activity.detail}</p>
                  </div>
                  <span className={styles.activityTime}>
                    {new Date(activity.timestamp).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>Complete onboarding to populate your activity trail.</div>
          )}
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Leaderboard preview</h2>
            <p className={styles.sectionLead}>Current top performers in the prototype arena circuit.</p>
          </div>
          <Link to="/leaderboard" className={styles.secondaryButton}>
            View all
          </Link>
        </div>
        <div className={styles.topThree}>
          {topPlayers.map((player, index) => (
            <article
              key={player.id}
              className={`${styles.podiumCard} ${
                index === 0
                  ? styles.podiumFirst
                  : index === 1
                    ? styles.podiumSecond
                    : styles.podiumThird
              }`}
            >
              <p className={styles.rank}>Top {index + 1}</p>
              <strong className={styles.rankValue}>{player.name.split(" ")[0]}</strong>
              <p className={styles.itemMeta}>{player.xp} XP</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
