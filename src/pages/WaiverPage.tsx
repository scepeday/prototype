import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../components/ui/ScreenHeader";
import StepProgress from "../components/ui/StepProgress";
import { onboardingLabels } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

const waiverSections = [
  {
    title: "Activity risk",
    text: "Obstacle rooms, climbing lanes, and movement-based missions can be physically demanding. Pace yourself and follow the guided flow.",
  },
  {
    title: "Venue rules",
    text: "Staff direction, queue rules, and room capacity limits still apply in this prototype version of the experience.",
  },
  {
    title: "Session expectations",
    text: "This mobile flow is for user testing only. It simulates sign-up, safety review, room joining, and challenge prep.",
  },
  {
    title: "Minors and guardians",
    text: "If this were a live release, younger players would need a guardian review path before participating.",
  },
  {
    title: "Consent",
    text: "Proceed only if you understand the prototype nature of the waiver step and the physical context of the venue.",
  },
];

export default function WaiverPage() {
  const navigate = useNavigate();
  const { acceptWaiver } = useAppState();
  const [checks, setChecks] = useState({
    physicalActivity: false,
    followRules: false,
    reviewedPrototype: false,
  });

  const canContinue = Object.values(checks).every(Boolean);

  return (
    <div className={styles.page}>
      <StepProgress currentStep={3} steps={onboardingLabels} />

      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Waiver"
          title="Review the arena expectations"
          description="This is a summarized, prototype-safe waiver step. It captures the structure of consent without reproducing legal copy."
        />
      </section>

      <section className={styles.section}>
        <div className={styles.stack}>
          {waiverSections.map((section) => (
            <article key={section.title} className={styles.card}>
              <h2 className={styles.itemTitle}>{section.title}</h2>
              <p className={styles.itemText}>{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={checks.physicalActivity}
              onChange={(event) =>
                setChecks((current) => ({
                  ...current,
                  physicalActivity: event.target.checked,
                }))
              }
            />
            <span>I understand this is a physical activity experience.</span>
          </label>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={checks.followRules}
              onChange={(event) =>
                setChecks((current) => ({
                  ...current,
                  followRules: event.target.checked,
                }))
              }
            />
            <span>I agree to follow venue rules and staff directions.</span>
          </label>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={checks.reviewedPrototype}
              onChange={(event) =>
                setChecks((current) => ({
                  ...current,
                  reviewedPrototype: event.target.checked,
                }))
              }
            />
            <span>I confirm I reviewed this prototype waiver step.</span>
          </label>
        </div>

        <button
          type="button"
          className={styles.primaryButton}
          disabled={!canContinue}
          onClick={() => {
            acceptWaiver({
              ...checks,
              acceptedAt: new Date().toISOString(),
            });
            navigate("/avatar");
          }}
        >
          Accept and Continue
        </button>
      </section>
    </div>
  );
}
