import { Link } from "react-router-dom";
import ScreenHeader from "../components/ui/ScreenHeader";
import { missions } from "../data/mockData";
import styles from "../styles/screen.module.css";

export default function MissionsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Missions"
          title="Choose your next run"
          description="Each mission card previews difficulty, category, zone, and XP reward so the prototype feels like a live challenge deck."
        />
      </section>

      <section className={styles.stack}>
        {missions.map((mission) => (
          <article key={mission.id} className={styles.missionCard}>
            <div className={styles.missionCardTop}>
              <div>
                <p className={`${styles.pill} ${mission.status === "Active" ? styles.pillLime : styles.pillCyan}`}>
                  {mission.status}
                </p>
                <h2 className={styles.itemTitle}>{mission.title}</h2>
                <p className={styles.itemText}>{mission.description}</p>
              </div>
              <span className={`${styles.pill} ${styles.pillCoral}`}>+{mission.xpReward} XP</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.pill}>{mission.category}</span>
              <span className={styles.pill}>{mission.difficulty}</span>
              <span className={styles.pill}>{mission.zone}</span>
            </div>
            <div className={styles.buttonRow}>
              <Link to="/scan" className={styles.primaryButton}>
                Start Scan Flow
              </Link>
              <Link to="/rooms" className={styles.ghostButton}>
                Find a Room
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
