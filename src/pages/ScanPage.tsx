import ScreenHeader from "../components/ui/ScreenHeader";
import { useAppState } from "../context/AppStateContext";
import { scanResultPool } from "../data/mockData";
import styles from "../styles/screen.module.css";

export default function ScanPage() {
  const { state, recordScan } = useAppState();
  const nextScan = scanResultPool[state.scanHistory.length % scanResultPool.length];
  const latestScan = state.scanHistory[0];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="QR Scan"
          title="Scan to discover"
          description="The scanner is UI-only, but it simulates mission completion, hidden rewards, and fast feedback inside the challenge loop."
        />
      </section>

      <section className={styles.card}>
        <div className={styles.scanner}>
          <div className={styles.scannerSweep} />
          <div className={styles.scannerHint}>
            <p className={styles.itemTitle}>Aim at arena markers or hidden challenge tokens</p>
            <p className={styles.itemText}>Prototype scanner frame only. No live camera integration is used.</p>
          </div>
        </div>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => recordScan(nextScan)}
        >
          Start Scanning
        </button>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Latest reward card</h2>
            <p className={styles.sectionLead}>Recent mission completion and hidden reward state.</p>
          </div>
        </div>
        {latestScan ? (
          <div className={styles.summaryCard}>
            <p className={`${styles.pill} ${styles.pillLime}`}>{latestScan.tag}</p>
            <h3 className={styles.itemTitle}>{latestScan.title}</h3>
            <p className={styles.itemText}>{latestScan.detail}</p>
            <p className={styles.itemMeta}>+{latestScan.xpAwarded} XP recorded</p>
          </div>
        ) : (
          <div className={styles.emptyState}>No scan history yet. Run the prototype scanner to create one.</div>
        )}
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Recent scan results</h2>
            <p className={styles.sectionLead}>Your latest discoveries are persisted locally.</p>
          </div>
        </div>
        <div className={styles.list}>
          {state.scanHistory.length > 0 ? (
            state.scanHistory.map((scan) => (
              <article key={`${scan.id}-${scan.detail}`} className={styles.listItem}>
                <div className={styles.spread}>
                  <div>
                    <p className={`${styles.pill} ${styles.pillCyan}`}>{scan.tag}</p>
                    <h3 className={styles.itemTitle}>{scan.title}</h3>
                    <p className={styles.itemText}>{scan.detail}</p>
                  </div>
                  <span className={`${styles.pill} ${styles.pillLime}`}>+{scan.xpAwarded}</span>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.emptyState}>Recent scan results will appear here after your first scan.</div>
          )}
        </div>
      </section>
    </div>
  );
}
