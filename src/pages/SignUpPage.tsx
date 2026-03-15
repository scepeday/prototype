import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "../components/ui/StepProgress";
import ScreenHeader from "../components/ui/ScreenHeader";
import { onboardingLabels } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const { state, completeSignup } = useAppState();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<FormState>({
    fullName: state.user?.fullName ?? "",
    email: state.user?.email ?? "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    completeSignup({
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
    });
    navigate("/how-it-works");
  }

  return (
    <div className={styles.page}>
      <StepProgress currentStep={1} steps={onboardingLabels} />

      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Pursuit OCR"
          title="Join the Challenge"
          description="Build a player profile, unlock your arena onboarding, and enter the prototype like you are gearing up for game day."
        />
        <div className={styles.supportRow}>
          <span className={styles.supportPill}>Frontend only</span>
          <span className={styles.supportPill}>Local save</span>
          <span className={styles.supportPill}>Mid-fi prototype</span>
        </div>
      </section>

      <section className={`${styles.card} ${styles.cardStrong}`}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
              placeholder="Alex Morgan"
              value={form.fullName}
              onChange={(event) =>
                setForm((current) => ({ ...current, fullName: event.target.value }))
              }
            />
            {errors.fullName ? <p className={styles.errorText}>{errors.fullName}</p> : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="player@pursuit.app"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
            />
            {errors.email ? <p className={styles.errorText}>{errors.email}</p> : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <div className={styles.passwordRow}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password ? <p className={styles.errorText}>{errors.password}</p> : null}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  confirmPassword: event.target.value,
                }))
              }
            />
            {errors.confirmPassword ? (
              <p className={styles.errorText}>{errors.confirmPassword}</p>
            ) : null}
          </div>

          <button type="submit" className={styles.primaryButton}>
            Create My Profile
          </button>
          <p className={styles.helper}>
            Prototype note: this is a local-only onboarding flow with no real account,
            backend, or live authentication.
          </p>
        </form>
      </section>
    </div>
  );
}
