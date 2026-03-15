import { useNavigate } from "react-router-dom";
import ScreenHeader from "../components/ui/ScreenHeader";
import StepProgress from "../components/ui/StepProgress";
import { howItWorksSteps, onboardingLabels } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

export default function HowItWorksPage() {
  const navigate = useNavigate();
  const { completeHowItWorks } = useAppState();

  return (
    <div className={styles.page}>
      <StepProgress currentStep={2} steps={onboardingLabels} />

      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="How It Works"
          title="Gear up before the arena opens"
          description="This prototype frames Pursuit OCR as a challenge companion. Learn the flow, then continue into the waiver and avatar setup."
        />
      </section>

      <section className={styles.section}>
        <div className={styles.stepsList}>
          {howItWorksSteps.map((step, index) => (
            <article key={step.id} className={styles.stepCard}>
              <div className={styles.stepIndex}>{index + 1}</div>
              <div>
                <h2 className={styles.itemTitle}>{step.title}</h2>
                <p className={styles.itemText}>{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <p className={styles.itemText}>
          Join the challenge, build your player, accept the prototype rules, then
          launch into missions, rooms, and QR discovery.
        </p>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => {
            completeHowItWorks();
            navigate("/waiver");
          }}
        >
          Continue to Waiver
        </button>
      </section>
    </div>
  );
}
