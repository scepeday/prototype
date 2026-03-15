import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../components/ui/ScreenHeader";
import { courses } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

export default function CreateRoomPage() {
  const navigate = useNavigate();
  const { createRoom } = useAppState();
  const [name, setName] = useState("Skyline Squad");
  const [roomType, setRoomType] = useState<"Competitive" | "Collaborative">(
    "Competitive",
  );
  const [courseId, setCourseId] = useState(courses[0].id);
  const [lobbySize, setLobbySize] = useState("8");
  const [privacy, setPrivacy] = useState<"Public" | "Private">("Public");
  const [summary, setSummary] = useState(
    "Fast-moving room for players who want a guided countdown, shared hype, and a clean mission loop.",
  );
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError("Room name is required.");
      return;
    }

    const room = createRoom({
      name: name.trim(),
      roomType,
      courseId,
      lobbySize: Number(lobbySize),
      privacy,
      summary: summary.trim(),
    });

    navigate(`/room/${room.id}`);
  }

  const selectedCourse = courses.find((course) => course.id === courseId);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Create Room"
          title="Launch a new lobby"
          description="Set the course, session type, lobby size, privacy, and summary before sending players into the next arena setup."
        />
      </section>

      <section className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="room-name">
              Room name
            </label>
            <input
              id="room-name"
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              value={name}
              onChange={(event) => {
                setError("");
                setName(event.target.value);
              }}
            />
            {error ? <p className={styles.errorText}>{error}</p> : null}
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="room-type">
                Room type
              </label>
              <select
                id="room-type"
                className={styles.select}
                value={roomType}
                onChange={(event) =>
                  setRoomType(event.target.value as "Competitive" | "Collaborative")
                }
              >
                <option value="Competitive">Competitive</option>
                <option value="Collaborative">Collaborative</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="privacy">
                Privacy
              </label>
              <select
                id="privacy"
                className={styles.select}
                value={privacy}
                onChange={(event) =>
                  setPrivacy(event.target.value as "Public" | "Private")
                }
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="course">
                Select course
              </label>
              <select
                id="course"
                className={styles.select}
                value={courseId}
                onChange={(event) => setCourseId(event.target.value)}
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="size">
                Lobby size
              </label>
              <select
                id="size"
                className={styles.select}
                value={lobbySize}
                onChange={(event) => setLobbySize(event.target.value)}
              >
                {["4", "6", "8", "10", "12", "16"].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="summary">
              Room summary
            </label>
            <textarea
              id="summary"
              className={styles.textarea}
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
          </div>

          <button type="submit" className={styles.primaryButton}>
            Create Room
          </button>
        </form>
      </section>

      <section className={styles.summaryCard}>
        <p className={`${styles.pill} ${styles.pillCyan}`}>{roomType}</p>
        <h2 className={styles.itemTitle}>{name}</h2>
        <p className={styles.itemText}>{summary}</p>
        <div className={styles.metaRow}>
          <span className={styles.pill}>{selectedCourse?.name}</span>
          <span className={styles.pill}>{selectedCourse?.zone}</span>
          <span className={styles.pill}>{lobbySize} players</span>
          <span className={styles.pill}>{privacy}</span>
        </div>
      </section>
    </div>
  );
}
