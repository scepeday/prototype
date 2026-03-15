import type { CSSProperties } from "react";
import type { AvatarConfig } from "../../types";
import styles from "./AvatarPreview.module.css";

interface AvatarPreviewProps {
  config: AvatarConfig;
  compact?: boolean;
}

const skinTones = {
  fair: "#f7d7c7",
  warm: "#d9a17a",
  gold: "#bb8458",
  deep: "#6f422b",
};

const hairColors = {
  carbon: "#181d27",
  bronze: "#7a4f2c",
  teal: "#2d7d8c",
};

const outfitColors = {
  neonTrack: "#d8ff3f",
  arenaBlack: "#272b39",
  electricBlue: "#4ae2ff",
};

const accentColors = {
  none: "#3d455c",
  visor: "#4ae2ff",
  earpiece: "#ff6f61",
  medal: "#d8ff3f",
};

export default function AvatarPreview({
  config,
  compact = false,
}: AvatarPreviewProps) {
  const style = {
    ["--skin" as string]: skinTones[config.skinTone as keyof typeof skinTones],
    ["--hair" as string]:
      hairColors[config.hairColor as keyof typeof hairColors],
    ["--outfit" as string]:
      outfitColors[config.outfit as keyof typeof outfitColors],
    ["--accent" as string]:
      accentColors[config.accessory as keyof typeof accentColors],
  } as CSSProperties;

  return (
    <section
      className={`${styles.stage} ${compact ? styles.compact : ""}`}
      style={style}
      aria-label="Avatar preview"
    >
      <div className={styles.ring} />
      <div className={styles.avatar}>
        <div className={`${styles.hair} ${styles[config.hairstyle]}`} />
        <div className={`${styles.head} ${styles[config.faceShape]}`}>
          <div className={`${styles.brows} ${styles[config.eyebrows]}`}>
            <span />
            <span />
          </div>
          <div className={`${styles.eyes} ${styles[config.eyes]}`}>
            <span />
            <span />
          </div>
          <div className={`${styles.nose} ${styles[config.nose]}`} />
          <div className={`${styles.mouth} ${styles[config.mouth]}`} />
        </div>
        <div className={styles.neck} />
        <div className={`${styles.body} ${styles[config.outfit]}`}>
          <div className={styles.collar} />
        </div>
        {config.accessory !== "none" ? (
          <div className={`${styles.accessory} ${styles[config.accessory]}`} />
        ) : null}
      </div>
      {!compact ? (
        <div className={styles.captionRow}>
          <span>{config.outfit.replace(/([A-Z])/g, " $1")}</span>
          <span>{config.accessory === "none" ? "No accessory" : config.accessory}</span>
        </div>
      ) : null}
    </section>
  );
}
