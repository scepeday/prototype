import styles from "./StatCard.module.css";

interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  tone?: "lime" | "cyan" | "coral";
}

export default function StatCard({
  label,
  value,
  detail,
  tone = "lime",
}: StatCardProps) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <p className={styles.label}>{label}</p>
      <strong className={styles.value}>{value}</strong>
      <p className={styles.detail}>{detail}</p>
    </article>
  );
}
