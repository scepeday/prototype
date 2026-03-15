import styles from "./StepProgress.module.css";

interface StepProgressProps {
  currentStep: number;
  steps: string[];
}

export default function StepProgress({
  currentStep,
  steps,
}: StepProgressProps) {
  return (
    <section className={styles.wrapper} aria-label="Onboarding progress">
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{
            width: `${((currentStep - 1) / Math.max(steps.length - 1, 1)) * 100}%`,
          }}
        />
      </div>
      <div className={styles.steps}>
        {steps.map((step, index) => {
          const position = index + 1;
          const state =
            position < currentStep
              ? styles.complete
              : position === currentStep
                ? styles.active
                : styles.pending;

          return (
            <div key={step} className={styles.step}>
              <span className={`${styles.dot} ${state}`}>{position}</span>
              <span className={styles.label}>{step}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
