import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScreenHeader from "../components/ui/ScreenHeader";
import { getCourseById } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

export default function RoomsPage() {
  const navigate = useNavigate();
  const { state, joinRoom } = useAppState();
  const [activeTab, setActiveTab] = useState<"my" | "public">("my");
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const myRooms = state.rooms.filter((room) =>
    room.participants.some((participant) => participant.name === state.user?.fullName),
  );

  const publicRooms = state.rooms.filter((room) => room.privacy === "Public");

  const roomsToShow = activeTab === "my" ? myRooms : publicRooms;

  function handlePrivateJoin() {
    const room = state.rooms.find(
      (item) => item.joinCode.toUpperCase() === joinCode.trim().toUpperCase(),
    );

    if (!room) {
      setJoinError("No room matches that join code.");
      return;
    }

    joinRoom(room.id);
    navigate(`/room/${room.id}`);
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Rooms / Lobby"
          title="Line up your arena squad"
          description="Browse public rooms, create your own lobby, or enter a private join code to lock into a challenge session."
        />
        <div className={styles.buttonRow}>
          <Link to="/create-room" className={styles.primaryButton}>
            Create Room
          </Link>
          <button type="button" className={styles.secondaryButton} onClick={handlePrivateJoin}>
            Join Private Room
          </button>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="joinCode">
            Private join code
          </label>
          <input
            id="joinCode"
            className={`${styles.input} ${joinError ? styles.inputError : ""}`}
            placeholder="Enter room code"
            value={joinCode}
            onChange={(event) => {
              setJoinError("");
              setJoinCode(event.target.value);
            }}
          />
          {joinError ? <p className={styles.errorText}>{joinError}</p> : null}
        </div>
      </section>

      <section className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "my" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("my")}
        >
          My Rooms
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "public" ? styles.tabActive : ""}`}
          onClick={() => setActiveTab("public")}
        >
          Public Rooms
        </button>
      </section>

      <section className={styles.stack}>
        {roomsToShow.length > 0 ? (
          roomsToShow.map((room) => {
            const course = getCourseById(room.courseId);
            return (
              <article key={room.id} className={styles.roomCard}>
                <div className={styles.roomTop}>
                  <div>
                    <p className={`${styles.pill} ${room.privacy === "Public" ? styles.pillLime : styles.pillCoral}`}>
                      {room.privacy}
                    </p>
                    <h2 className={styles.itemTitle}>{room.name}</h2>
                    <p className={styles.itemText}>{room.summary}</p>
                  </div>
                  <span className={`${styles.pill} ${styles.pillCyan}`}>{room.roomType}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.pill}>{course?.name ?? "Custom"}</span>
                  <span className={styles.pill}>{room.zone}</span>
                  <span className={styles.pill}>
                    {room.participants.length}/{room.lobbySize} players
                  </span>
                </div>
                <Link to={`/room/${room.id}`} className={styles.primaryButton}>
                  Open Room
                </Link>
              </article>
            );
          })
        ) : (
          <div className={styles.emptyState}>
            {activeTab === "my"
              ? "You have not joined any rooms yet."
              : "No public rooms are available right now."}
          </div>
        )}
      </section>
    </div>
  );
}
