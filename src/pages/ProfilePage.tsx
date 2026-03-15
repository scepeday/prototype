import { Link, useNavigate } from "react-router-dom";
import AvatarPreview from "../components/avatar/AvatarPreview";
import ScreenHeader from "../components/ui/ScreenHeader";
import StatCard from "../components/ui/StatCard";
import { getReadinessPercentage, useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state, resetPrototype } = useAppState();
  const readiness = getReadinessPercentage(state);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Profile"
          title={state.user?.fullName ?? "Current Player"}
          description="Player stats, avatar, waiver status, and prototype controls live here."
        />
      </section>

      <section className={styles.split}>
        <AvatarPreview config={state.avatar} />
        <section className={styles.card}>
          <div className={styles.stack}>
            <div>
              <h2 className={styles.itemTitle}>{state.user?.email ?? "No email saved"}</h2>
              <p className={styles.itemMeta}>
                Waiver status: {state.onboarding.waiverAccepted ? "Accepted" : "Pending"}
              </p>
            </div>
            <div>
              <p className={styles.itemMeta}>Prototype readiness</p>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${readiness}%` }} />
              </div>
            </div>
            <div className={styles.buttonRow}>
              <Link to="/avatar" className={styles.secondaryButton}>
                Edit Avatar
              </Link>
              <button
                type="button"
                className={styles.dangerButton}
                onClick={() => {
                  if (!window.confirm("Reset all local prototype data?")) {
                    return;
                  }

                  resetPrototype();
                  navigate("/signup");
                }}
              >
                Reset Prototype Data
              </button>
            </div>
          </div>
        </section>
      </section>

      <section className={styles.statsGrid}>
        <StatCard label="Total XP" value={String(state.stats.xp)} detail="Local progress" tone="lime" />
        <StatCard
          label="Missions"
          value={String(state.stats.missionsCompleted)}
          detail="Completed via scan"
          tone="cyan"
        />
        <StatCard
          label="Badges"
          value={String(state.earnedBadgeIds.length)}
          detail="Current unlocks"
          tone="coral"
        />
      </section>
    </div>
  );
}
