import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import {
  accentCycle,
  badges,
  defaultActivity,
  defaultAvatar,
  defaultRooms,
} from "../data/mockData";
import { clearState, loadState, saveState } from "../lib/storage";
import type {
  ActivityItem,
  AppState,
  AvatarConfig,
  Room,
  ScanResult,
  UserProfile,
  WaiverChecklist,
} from "../types";

type CreateRoomInput = Omit<
  Room,
  "id" | "ownerName" | "participants" | "joinCode" | "createdAt" | "zone"
>;

type AppAction =
  | { type: "completeSignup"; payload: UserProfile }
  | { type: "completeHowItWorks" }
  | { type: "acceptWaiver"; payload: WaiverChecklist }
  | { type: "saveAvatar"; payload: AvatarConfig }
  | { type: "addRoom"; payload: Room }
  | { type: "joinRoom"; payload: { roomId: string; playerName: string } }
  | { type: "leaveRoom"; payload: { roomId: string; playerName: string } }
  | { type: "recordScan"; payload: ScanResult }
  | { type: "resetPrototype" };

interface AppStateContextValue {
  state: AppState;
  completeSignup: (profile: UserProfile) => void;
  completeHowItWorks: () => void;
  acceptWaiver: (checklist: WaiverChecklist) => void;
  saveAvatarProfile: (avatar: AvatarConfig) => void;
  createRoom: (input: CreateRoomInput) => Room;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  recordScan: (scan: ScanResult) => void;
  resetPrototype: () => void;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined,
);

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createJoinCode(name: string) {
  const sanitized = name.replace(/[^a-z0-9]/gi, "").toUpperCase();
  const base = sanitized.slice(0, 5) || "ROOM";
  const suffix = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `${base}${suffix}`;
}

function createActivity(
  title: string,
  detail: string,
  tone: ActivityItem["tone"],
): ActivityItem {
  return {
    id: createId("activity"),
    title,
    detail,
    timestamp: new Date().toISOString(),
    tone,
  };
}

function withActivity(state: AppState, activity: ActivityItem) {
  return {
    ...state,
    recentActivity: [activity, ...state.recentActivity].slice(0, 6),
  };
}

function syncBadges(state: AppState) {
  return badges
    .filter((badge) => {
      switch (badge.id) {
        case "rookie-challenger":
          return state.stats.xp >= 100;
        case "arena-explorer":
          return state.onboarding.avatarCreated;
        case "hidden-hunter":
          return state.stats.scanCount >= 1;
        case "team-player":
          return state.rooms.some((room) =>
            room.participants.some(
              (participant) => participant.name === state.user?.fullName,
            ),
          );
        case "wall-runner":
          return state.stats.missionsCompleted >= 2;
        default:
          return false;
      }
    })
    .map((badge) => badge.id);
}

function getInitialState(): AppState {
  const state: AppState = {
    user: null,
    onboarding: {
      signupComplete: false,
      howItWorksComplete: false,
      waiverAccepted: false,
      avatarCreated: false,
    },
    waiver: {
      physicalActivity: false,
      followRules: false,
      reviewedPrototype: false,
    },
    avatar: defaultAvatar,
    rooms: defaultRooms,
    earnedBadgeIds: [],
    recentActivity: defaultActivity,
    scanHistory: [],
    stats: {
      xp: 0,
      missionsCompleted: 0,
      scanCount: 0,
    },
  };

  return {
    ...state,
    earnedBadgeIds: syncBadges(state),
  };
}

function normalizeState(input: AppState | null) {
  const fallback = getInitialState();
  if (!input) {
    return fallback;
  }

  const merged: AppState = {
    ...fallback,
    ...input,
    onboarding: {
      ...fallback.onboarding,
      ...input.onboarding,
    },
    waiver: {
      ...fallback.waiver,
      ...input.waiver,
    },
    avatar: {
      ...fallback.avatar,
      ...input.avatar,
    },
    rooms: Array.isArray(input.rooms) && input.rooms.length > 0 ? input.rooms : fallback.rooms,
    recentActivity: Array.isArray(input.recentActivity)
      ? input.recentActivity
      : fallback.recentActivity,
    scanHistory: Array.isArray(input.scanHistory)
      ? input.scanHistory
      : fallback.scanHistory,
    stats: {
      ...fallback.stats,
      ...input.stats,
    },
  };

  return {
    ...merged,
    earnedBadgeIds: syncBadges(merged),
  };
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "completeSignup": {
      if (state.onboarding.signupComplete) {
        return {
          ...state,
          user: action.payload,
        };
      }

      const nextState = withActivity(
        {
          ...state,
          user: action.payload,
          onboarding: {
            ...state.onboarding,
            signupComplete: true,
          },
          stats: {
            ...state.stats,
            xp: state.stats.xp + 30,
          },
        },
        createActivity(
          "Profile unlocked",
          "Your challenger card is ready to enter the onboarding arena.",
          "lime",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "completeHowItWorks": {
      if (state.onboarding.howItWorksComplete) {
        return state;
      }

      const nextState = withActivity(
        {
          ...state,
          onboarding: {
            ...state.onboarding,
            howItWorksComplete: true,
          },
          stats: {
            ...state.stats,
            xp: state.stats.xp + 20,
          },
        },
        createActivity(
          "Rules reviewed",
          "You completed the challenge guide and unlocked the waiver step.",
          "cyan",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "acceptWaiver": {
      if (state.onboarding.waiverAccepted) {
        return {
          ...state,
          waiver: action.payload,
        };
      }

      const nextState = withActivity(
        {
          ...state,
          waiver: action.payload,
          onboarding: {
            ...state.onboarding,
            waiverAccepted: true,
          },
          stats: {
            ...state.stats,
            xp: state.stats.xp + 40,
          },
        },
        createActivity(
          "Waiver accepted",
          "Arena safety, venue rules, and prototype expectations are confirmed.",
          "coral",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "saveAvatar": {
      if (state.onboarding.avatarCreated) {
        return {
          ...state,
          avatar: action.payload,
          earnedBadgeIds: syncBadges({
            ...state,
            avatar: action.payload,
          }),
        };
      }

      const nextState = withActivity(
        {
          ...state,
          avatar: action.payload,
          onboarding: {
            ...state.onboarding,
            avatarCreated: true,
          },
          stats: {
            ...state.stats,
            xp: state.stats.xp + 80,
          },
        },
        createActivity(
          "Avatar deployed",
          "Your player look is live across rooms, rewards, and challenge previews.",
          "lime",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "addRoom": {
      const nextState = withActivity(
        {
          ...state,
          rooms: [action.payload, ...state.rooms],
          stats: {
            ...state.stats,
            xp: state.stats.xp + 30,
          },
        },
        createActivity(
          "Room created",
          `${action.payload.name} is live and waiting for challengers to join.`,
          "cyan",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "joinRoom": {
      let didJoin = false;
      const nextRooms = state.rooms.map((room) => {
        if (room.id !== action.payload.roomId) {
          return room;
        }

        const alreadyJoined = room.participants.some(
          (participant) => participant.name === action.payload.playerName,
        );

        if (alreadyJoined || room.participants.length >= room.lobbySize) {
          return room;
        }

        didJoin = true;
        return {
          ...room,
          participants: [
            ...room.participants,
            {
              id: createId("player"),
              name: action.payload.playerName,
              accent:
                accentCycle[room.participants.length % accentCycle.length],
            },
          ],
        };
      });

      if (!didJoin) {
        return state;
      }

      const targetRoom = nextRooms.find((room) => room.id === action.payload.roomId);
      const nextState = withActivity(
        {
          ...state,
          rooms: nextRooms,
          stats: {
            ...state.stats,
            xp: state.stats.xp + 20,
          },
        },
        createActivity(
          "Room joined",
          `You stepped into ${targetRoom?.name ?? "the lobby"} and synced with the squad.`,
          "lime",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "leaveRoom": {
      let didLeave = false;
      const nextRooms = state.rooms.map((room) =>
        room.id === action.payload.roomId
          ? {
              ...room,
              participants: room.participants.filter((participant) => {
                const shouldKeep = participant.name !== action.payload.playerName;
                if (!shouldKeep) {
                  didLeave = true;
                }

                return shouldKeep;
              }),
            }
          : room,
      );

      if (!didLeave) {
        return state;
      }

      const targetRoom = nextRooms.find((room) => room.id === action.payload.roomId);
      const nextState = withActivity(
        {
          ...state,
          rooms: nextRooms,
        },
        createActivity(
          "Room exited",
          `You left ${targetRoom?.name ?? "the room"} and returned to the lobby.`,
          "coral",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "recordScan": {
      const missionBoost = action.payload.tag === "Mission Complete" ? 1 : 0;
      const nextState = withActivity(
        {
          ...state,
          scanHistory: [action.payload, ...state.scanHistory].slice(0, 6),
          stats: {
            xp: state.stats.xp + action.payload.xpAwarded,
            missionsCompleted: state.stats.missionsCompleted + missionBoost,
            scanCount: state.stats.scanCount + 1,
          },
        },
        createActivity(
          action.payload.title,
          `${action.payload.tag} recorded for +${action.payload.xpAwarded} XP.`,
          "lime",
        ),
      );

      return {
        ...nextState,
        earnedBadgeIds: syncBadges(nextState),
      };
    }
    case "resetPrototype":
      return getInitialState();
    default:
      return state;
  }
}

export function getReadinessPercentage(state: AppState) {
  const completedSteps = [
    state.onboarding.signupComplete,
    state.onboarding.howItWorksComplete,
    state.onboarding.waiverAccepted,
    state.onboarding.avatarCreated,
  ].filter(Boolean).length;

  return Math.round((completedSteps / 4) * 100);
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () =>
    normalizeState(loadState()),
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value: AppStateContextValue = {
    state,
    completeSignup(profile) {
      dispatch({ type: "completeSignup", payload: profile });
    },
    completeHowItWorks() {
      dispatch({ type: "completeHowItWorks" });
    },
    acceptWaiver(checklist) {
      dispatch({ type: "acceptWaiver", payload: checklist });
    },
    saveAvatarProfile(avatar) {
      dispatch({ type: "saveAvatar", payload: avatar });
    },
    createRoom(input) {
      const ownerName = state.user?.fullName ?? "Guest Challenger";
      const room: Room = {
        id: createId("room"),
        ownerName,
        participants: [
          {
            id: createId("player"),
            name: ownerName,
            accent: "lime",
          },
        ],
        joinCode: createJoinCode(input.name),
        createdAt: new Date().toISOString(),
        zone:
          input.courseId === "tricycle-race"
            ? "Turbo Alley"
            : input.courseId === "wall-climbing"
              ? "Summit Zone"
              : input.courseId === "volleyball"
                ? "Sky Court"
                : "Chaos Court",
        ...input,
      };

      dispatch({ type: "addRoom", payload: room });
      return room;
    },
    joinRoom(roomId) {
      if (!state.user?.fullName) {
        return;
      }

      dispatch({
        type: "joinRoom",
        payload: { roomId, playerName: state.user.fullName },
      });
    },
    leaveRoom(roomId) {
      if (!state.user?.fullName) {
        return;
      }

      dispatch({
        type: "leaveRoom",
        payload: { roomId, playerName: state.user.fullName },
      });
    },
    recordScan(scan) {
      dispatch({ type: "recordScan", payload: scan });
    },
    resetPrototype() {
      clearState();
      dispatch({ type: "resetPrototype" });
    },
  };

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }

  return context;
}
