import { Link } from "react-router-dom";
import ScreenHeader from "../components/ui/ScreenHeader";
import { badges } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

export default function RewardsPage() {
  const { state } = useAppState();
  const earnedBadges = badges.filter((badge) => state.earnedBadgeIds.includes(badge.id));
  const lockedBadges = badges.filter((badge) => !state.earnedBadgeIds.includes(badge.id));
  const nextUnlock = lockedBadges[0];
  const progress = nextUnlock
    ? Math.min(100, Math.round((state.stats.xp / nextUnlock.xpRequired) * 100))
    : 100;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Rewards"
          title="Badges and unlocks"
          description="Track earned and locked rewards, total XP, and the progress still needed to reach the next milestone."
        />
        <div className={styles.buttonRow}>
          <Link to="/leaderboard" className={styles.secondaryButton}>
            View Leaderboard
          </Link>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Progress to next unlock</h2>
            <p className={styles.sectionLead}>
              {nextUnlock
                ? `${nextUnlock.name} unlocks at ${nextUnlock.xpRequired} XP.`
                : "All prototype badges are unlocked."}
            </p>
          </div>
          <span className={`${styles.pill} ${styles.pillLime}`}>{state.stats.xp} XP</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Earned badges</h2>
            <p className={styles.sectionLead}>Rewards already unlocked in local prototype progress.</p>
          </div>
        </div>
        <div className={styles.stack}>
          {earnedBadges.length > 0 ? (
            earnedBadges.map((badge) => (
              <article key={badge.id} className={styles.badgeCard}>
                <div className={styles.spread}>
                  <div>
                    <p className={`${styles.pill} ${styles.pillLime}`}>Earned</p>
                    <h3 className={styles.itemTitle}>{badge.name}</h3>
                    <p className={styles.itemText}>{badge.description}</p>
                  </div>
                  <div className={styles.avatarBadge}>{badge.icon}</div>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>Earned badges will appear after you build progress.</div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Locked badges</h2>
            <p className={styles.sectionLead}>These stay visible to reinforce the game loop.</p>
          </div>
        </div>
        <div className={styles.stack}>
          {lockedBadges.map((badge) => (
            <article key={badge.id} className={styles.badgeCard}>
              <div className={styles.spread}>
                <div>
                  <p className={`${styles.pill} ${styles.pillCoral}`}>Locked</p>
                  <h3 className={styles.itemTitle}>{badge.name}</h3>
                  <p className={styles.itemText}>{badge.description}</p>
                </div>
                <div className={styles.avatarBadge}>{badge.icon}</div>
              </div>
              <p className={styles.itemMeta}>Unlock requirement: {badge.xpRequired} XP</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
