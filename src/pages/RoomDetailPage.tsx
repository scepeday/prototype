import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../components/ui/ScreenHeader";
import { getCourseById } from "../data/mockData";
import { useAppState } from "../context/AppStateContext";
import styles from "../styles/screen.module.css";

export default function RoomDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, joinRoom, leaveRoom } = useAppState();
  const [notice, setNotice] = useState("");
  const room = state.rooms.find((entry) => entry.id === id);

  if (!room) {
    return (
      <div className={styles.page}>
        <section className={styles.card}>
          <h1 className={styles.itemTitle}>Room not found</h1>
          <p className={styles.itemText}>That room may have been reset from local prototype data.</p>
          <Link to="/rooms" className={styles.primaryButton}>
            Back to Rooms
          </Link>
        </section>
      </div>
    );
  }

  const activeRoom = room;
  const course = getCourseById(activeRoom.courseId);
  const currentUser = state.user?.fullName;
  const isOwner = currentUser === activeRoom.ownerName;
  const isParticipant = activeRoom.participants.some(
    (participant) => participant.name === currentUser,
  );

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(activeRoom.joinCode);
      setNotice(`Join code ${activeRoom.joinCode} copied.`);
    } catch {
      setNotice(`Join code: ${activeRoom.joinCode}`);
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <ScreenHeader
          eyebrow="Room Detail"
          title={activeRoom.name}
          description={activeRoom.summary}
        />
        <div className={styles.supportRow}>
          <span className={`${styles.supportPill} ${styles.pillCyan}`}>{activeRoom.roomType}</span>
          <span className={`${styles.supportPill} ${activeRoom.privacy === "Public" ? styles.pillLime : styles.pillCoral}`}>
            {activeRoom.privacy}
          </span>
        </div>
      </section>

      {notice ? <section className={styles.notice}>{notice}</section> : null}

      <section className={styles.card}>
        <div className={styles.metaRow}>
          <span className={styles.pill}>{course?.name}</span>
          <span className={styles.pill}>{activeRoom.zone}</span>
          <span className={styles.pill}>
            {activeRoom.participants.length}/{activeRoom.lobbySize} players
          </span>
          <span className={styles.pill}>Owner: {activeRoom.ownerName}</span>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.buttonRow}>
          {isOwner ? (
            <>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setNotice("Owner controls are shown as a prototype state only.")}
              >
                Manage Room
              </button>
              <button type="button" className={styles.secondaryButton} onClick={handleCopyCode}>
                Copy Join Code
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() =>
                  setNotice("Room ready. Live gameplay begins outside this prototype.")
                }
              >
                Enter Room
              </button>
            </>
          ) : isParticipant ? (
            <>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() =>
                  setNotice("Room ready. Live gameplay begins outside this prototype.")
                }
              >
                Enter Room
              </button>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => {
                  leaveRoom(activeRoom.id);
                  navigate("/rooms");
                }}
              >
                Leave Room
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => {
                  joinRoom(activeRoom.id);
                  setNotice(`You joined ${activeRoom.name}.`);
                }}
              >
                Join Room
              </button>
              <button type="button" className={styles.secondaryButton} onClick={handleCopyCode}>
                Copy Join Code
              </button>
            </>
          )}
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Players</h2>
            <p className={styles.sectionLead}>Owner and participant states are surfaced in the roster.</p>
          </div>
        </div>
        <div className={styles.tableList}>
          {activeRoom.participants.map((participant) => (
            <article key={participant.id} className={styles.tableRow}>
              <div className={styles.avatarBadge}>{participant.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <h3 className={styles.itemTitle}>{participant.name}</h3>
                <p className={styles.itemMeta}>
                  {participant.name === activeRoom.ownerName ? "Room owner" : "Participant"}
                </p>
              </div>
              {participant.name === currentUser ? (
                <span className={`${styles.pill} ${styles.pillLime}`}>You</span>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
