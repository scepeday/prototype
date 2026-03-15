import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarPreview from "../components/avatar/AvatarPreview";
import ScreenHeader from "../components/ui/ScreenHeader";
import StepProgress from "../components/ui/StepProgress";
import { avatarOptions, defaultAvatar, onboardingLabels } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import type { AvatarConfig } from "../types";
import styles from "../styles/screen.module.css";

const optionEntries = Object.entries(avatarOptions) as Array<
  [keyof AvatarConfig, readonly { value: string; label: string }[]]
>;

export default function AvatarPage() {
  const navigate = useNavigate();
  const { state, saveAvatarProfile } = useAppState();
  const [draft, setDraft] = useState<AvatarConfig>(state.avatar);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      return;
    }

    const timeout = window.setTimeout(() => {
      navigate("/dashboard");
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [navigate, saved]);

  function handleRandomize() {
    const nextAvatar = optionEntries.reduce((accumulator, [category, options]) => {
      const nextIndex = Math.floor(Math.random() * options.length);
      return {
        ...accumulator,
        [category]: options[nextIndex].value,
      };
    }, {} as AvatarConfig);

    setDraft(nextAvatar);
  }

  return (
    <div className={styles.page}>
      <StepProgress currentStep={4} steps={onboardingLabels} />

      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Avatar Creation"
          title="Build your player"
          description="Create a semi-cartoon arena identity with a sporty silhouette, quick accessory swaps, and real-time preview updates."
        />
      </section>

      <section className={styles.split}>
        <AvatarPreview config={draft} />

        <div className={styles.card}>
          <div className={styles.avatarControls}>
            <button type="button" className={styles.secondaryButton} onClick={handleRandomize}>
              Randomize
            </button>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={() => setDraft(defaultAvatar)}
            >
              Reset
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                saveAvatarProfile(draft);
                setSaved(true);
              }}
            >
              Save Avatar
            </button>
          </div>
          <p className={styles.helper}>
            Inspiration: Memoji, Mii, Bitmoji, Zepeto, and Create-a-Sim. The
            visuals here are original and prototype-safe.
          </p>
          {saved ? (
            <div className={styles.successState}>
              Avatar saved. Your challenger profile is now live.
            </div>
          ) : null}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.stack}>
          {optionEntries.map(([category, options]) => (
            <article key={category} className={styles.categoryCard}>
              <h2 className={styles.categoryTitle}>
                {category.replace(/([A-Z])/g, " $1")}
              </h2>
              <div className={styles.optionGrid}>
                {options.map((option) => {
                  const isActive = draft[category] === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          [category]: option.value,
                        }))
                      }
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
