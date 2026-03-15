import type {
  ActivityItem,
  AvatarConfig,
  Badge,
  Course,
  LeaderboardEntry,
  Mission,
  Room,
  ScanResult,
} from "../types";

export const onboardingLabels = ["Profile", "Guide", "Waiver", "Avatar"];

export const howItWorksSteps = [
  {
    id: "profile",
    title: "Create your player card",
    detail:
      "Start with your challenge identity so the prototype can track XP, rooms, badges, and your route through the arena.",
  },
  {
    id: "rules",
    title: "Review the game flow",
    detail:
      "Learn how rooms, missions, and QR discovery work before stepping into the obstacle zones.",
  },
  {
    id: "waiver",
    title: "Accept the prototype waiver",
    detail:
      "Acknowledge the physical nature of the experience, the venue rules, and the expectations for guided play.",
  },
  {
    id: "avatar",
    title: "Build your arena avatar",
    detail:
      "Customize a sporty, friendly avatar that appears in rooms, rewards, and the leaderboard preview.",
  },
  {
    id: "launch",
    title: "Join missions and scan codes",
    detail:
      "Head to the dashboard, enter rooms, scan hidden markers, and unlock badges as you progress.",
  },
];

export const missions: Mission[] = [
  {
    id: "sprint-circuit",
    title: "Sprint Circuit",
    description:
      "Push through the opening lane with speed bursts and timed relay checkpoints.",
    category: "Speed Run",
    difficulty: "Medium",
    xpReward: 120,
    status: "Active",
    zone: "Launch Pad",
  },
  {
    id: "tricycle-chaos",
    title: "Tricycle Chaos",
    description:
      "Race low and fast through traffic cones while your squad earns combo bonuses.",
    category: "Team Play",
    difficulty: "Easy",
    xpReward: 90,
    status: "Available",
    zone: "Turbo Alley",
  },
  {
    id: "wall-climb-rush",
    title: "Wall Climb Rush",
    description:
      "Climb, ring in, and descend before the pulse lights lock the next ledge.",
    category: "Vertical",
    difficulty: "Hard",
    xpReward: 160,
    status: "Available",
    zone: "Summit Zone",
  },
  {
    id: "ball-pit-recovery",
    title: "Ball Pit Recovery",
    description:
      "Dive for hidden targets and recover bonus tokens from the arena floor.",
    category: "Discovery",
    difficulty: "Medium",
    xpReward: 140,
    status: "Available",
    zone: "Chaos Court",
  },
];

export const courses: Course[] = [
  {
    id: "ball-pit",
    name: "Ball Pit",
    zone: "Chaos Court",
    theme: "Hidden targets and recovery loops",
  },
  {
    id: "tricycle-race",
    name: "Tricycle Race",
    zone: "Turbo Alley",
    theme: "Speed gates and tight team relays",
  },
  {
    id: "wall-climbing",
    name: "Wall Climbing",
    zone: "Summit Zone",
    theme: "Vertical race with pulse-light checkpoints",
  },
  {
    id: "volleyball",
    name: "Volleyball",
    zone: "Sky Court",
    theme: "Collaborative volley rounds and team streaks",
  },
];

export const defaultAvatar: AvatarConfig = {
  skinTone: "warm",
  faceShape: "round",
  eyes: "wide",
  eyebrows: "arch",
  nose: "classic",
  mouth: "grin",
  hairstyle: "quiff",
  hairColor: "carbon",
  outfit: "neonTrack",
  accessory: "visor",
};

export const avatarOptions = {
  skinTone: [
    { value: "fair", label: "Fair Glow" },
    { value: "warm", label: "Warm Tan" },
    { value: "gold", label: "Golden" },
    { value: "deep", label: "Deep Cocoa" },
  ],
  faceShape: [
    { value: "round", label: "Round" },
    { value: "softSquare", label: "Soft Square" },
    { value: "heart", label: "Heart" },
  ],
  eyes: [
    { value: "wide", label: "Wide" },
    { value: "sharp", label: "Sharp" },
    { value: "smile", label: "Smile" },
  ],
  eyebrows: [
    { value: "flat", label: "Flat" },
    { value: "arch", label: "Arch" },
    { value: "bold", label: "Bold" },
  ],
  nose: [
    { value: "button", label: "Button" },
    { value: "classic", label: "Classic" },
    { value: "defined", label: "Defined" },
  ],
  mouth: [
    { value: "grin", label: "Grin" },
    { value: "smirk", label: "Smirk" },
    { value: "calm", label: "Calm" },
  ],
  hairstyle: [
    { value: "quiff", label: "Quiff" },
    { value: "wave", label: "Wave" },
    { value: "spikes", label: "Spikes" },
    { value: "buzz", label: "Buzz" },
  ],
  hairColor: [
    { value: "carbon", label: "Carbon" },
    { value: "bronze", label: "Bronze" },
    { value: "teal", label: "Teal" },
  ],
  outfit: [
    { value: "neonTrack", label: "Neon Track" },
    { value: "arenaBlack", label: "Arena Black" },
    { value: "electricBlue", label: "Electric Blue" },
  ],
  accessory: [
    { value: "none", label: "None" },
    { value: "visor", label: "Visor" },
    { value: "earpiece", label: "Earpiece" },
    { value: "medal", label: "Medal" },
  ],
} as const;

export const badges: Badge[] = [
  {
    id: "rookie-challenger",
    name: "Rookie Challenger",
    description: "Hit 100 XP and unlock your first arena credential.",
    xpRequired: 100,
    accent: "lime",
    icon: "RC",
  },
  {
    id: "arena-explorer",
    name: "Arena Explorer",
    description: "Complete onboarding and get ready for live mission play.",
    xpRequired: 150,
    accent: "cyan",
    icon: "AE",
  },
  {
    id: "hidden-hunter",
    name: "Hidden Hunter",
    description: "Record your first scan and reveal a hidden reward trail.",
    xpRequired: 200,
    accent: "coral",
    icon: "HH",
  },
  {
    id: "team-player",
    name: "Team Player",
    description: "Join or create a room and line up with other challengers.",
    xpRequired: 240,
    accent: "lime",
    icon: "TP",
  },
  {
    id: "wall-runner",
    name: "Wall Runner",
    description: "Complete two mission scans and hold a steady arena streak.",
    xpRequired: 320,
    accent: "cyan",
    icon: "WR",
  },
];

export const leaderboardSeed: LeaderboardEntry[] = [
  {
    id: "nova",
    name: "Nova Kane",
    xp: 760,
    badges: 8,
    streak: 6,
    accent: "lime",
    isFriend: true,
  },
  {
    id: "jax",
    name: "Jax Rivera",
    xp: 720,
    badges: 7,
    streak: 5,
    accent: "coral",
    isFriend: true,
  },
  {
    id: "mika",
    name: "Mika Chen",
    xp: 680,
    badges: 7,
    streak: 4,
    accent: "cyan",
    isFriend: false,
  },
  {
    id: "sol",
    name: "Sol Harper",
    xp: 620,
    badges: 6,
    streak: 4,
    accent: "lime",
    isFriend: true,
  },
  {
    id: "rhea",
    name: "Rhea Brooks",
    xp: 560,
    badges: 5,
    streak: 3,
    accent: "coral",
    isFriend: false,
  },
];

export const scanResultPool: ScanResult[] = [
  {
    id: "scan-sprint",
    title: "Sprint Circuit cleared",
    detail: "Checkpoint chain complete. Your timing bonus has been banked.",
    xpAwarded: 55,
    tag: "Mission Complete",
  },
  {
    id: "scan-hidden",
    title: "Hidden token uncovered",
    detail: "A secret badge fragment was found behind the challenge gate.",
    xpAwarded: 35,
    tag: "Hidden Reward",
  },
  {
    id: "scan-discovery",
    title: "Arena lore unlocked",
    detail: "You scanned a clue marker and opened a bonus discovery note.",
    xpAwarded: 25,
    tag: "Discovery",
  },
];

export const defaultRooms: Room[] = [
  {
    id: "room-storm-lap",
    name: "Storm Lap",
    roomType: "Competitive",
    courseId: "tricycle-race",
    lobbySize: 8,
    privacy: "Public",
    zone: "Turbo Alley",
    ownerName: "Nova Kane",
    participants: [
      { id: "nova", name: "Nova Kane", accent: "lime" },
      { id: "jax", name: "Jax Rivera", accent: "coral" },
      { id: "rhea", name: "Rhea Brooks", accent: "cyan" },
    ],
    joinCode: "STORM8",
    summary: "Fast relay room for players who want a live countdown and ranked finish.",
    createdAt: "2026-03-15T15:00:00.000Z",
  },
  {
    id: "room-hidden-hunt",
    name: "Hidden Hunt Crew",
    roomType: "Collaborative",
    courseId: "ball-pit",
    lobbySize: 10,
    privacy: "Public",
    zone: "Chaos Court",
    ownerName: "Mika Chen",
    participants: [
      { id: "mika", name: "Mika Chen", accent: "cyan" },
      { id: "sol", name: "Sol Harper", accent: "lime" },
    ],
    joinCode: "HUNT10",
    summary: "Discovery-first lobby focused on QR rewards, scans, and hidden arena finds.",
    createdAt: "2026-03-15T15:10:00.000Z",
  },
  {
    id: "room-summit",
    name: "Summit Pulse",
    roomType: "Competitive",
    courseId: "wall-climbing",
    lobbySize: 6,
    privacy: "Private",
    zone: "Summit Zone",
    ownerName: "Sol Harper",
    participants: [
      { id: "sol", name: "Sol Harper", accent: "lime" },
      { id: "mika", name: "Mika Chen", accent: "cyan" },
    ],
    joinCode: "CLIMB6",
    summary: "Closed vertical sprint room for experienced climbers and short rotation rounds.",
    createdAt: "2026-03-15T15:15:00.000Z",
  },
];

export const defaultActivity: ActivityItem[] = [];

export const accentCycle = ["lime", "cyan", "coral"] as const;

export function getCourseById(courseId: string) {
  return courses.find((course) => course.id === courseId);
}
