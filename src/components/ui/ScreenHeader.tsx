import type { ReactNode } from "react";
import styles from "./ScreenHeader.module.css";

interface ScreenHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function ScreenHeader({
  eyebrow,
  title,
  description,
  action,
}: ScreenHeaderProps) {
  return (
    <header className={styles.header}>
      <div>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
}
