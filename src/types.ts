export interface UserProfile {
  fullName: string;
  email: string;
}

export interface OnboardingState {
  signupComplete: boolean;
  howItWorksComplete: boolean;
  waiverAccepted: boolean;
  avatarCreated: boolean;
}

export interface WaiverChecklist {
  physicalActivity: boolean;
  followRules: boolean;
  reviewedPrototype: boolean;
  acceptedAt?: string;
}

export interface AvatarConfig {
  skinTone: string;
  faceShape: string;
  eyes: string;
  eyebrows: string;
  nose: string;
  mouth: string;
  hairstyle: string;
  hairColor: string;
  outfit: string;
  accessory: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xpReward: number;
  status: "Active" | "Available" | "Locked";
  zone: string;
}

export interface Course {
  id: string;
  name: string;
  zone: string;
  theme: string;
}

export interface RoomParticipant {
  id: string;
  name: string;
  accent: string;
}

export interface Room {
  id: string;
  name: string;
  roomType: "Competitive" | "Collaborative";
  courseId: string;
  lobbySize: number;
  privacy: "Public" | "Private";
  zone: string;
  ownerName: string;
  participants: RoomParticipant[];
  joinCode: string;
  summary: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  xpRequired: number;
  accent: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  tone: "lime" | "cyan" | "coral";
}

export interface ScanResult {
  id: string;
  title: string;
  detail: string;
  xpAwarded: number;
  tag: "Mission Complete" | "Hidden Reward" | "Discovery";
}

export interface PlayerStats {
  xp: number;
  missionsCompleted: number;
  scanCount: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  badges: number;
  streak: number;
  accent: string;
  isFriend: boolean;
}

export interface AppState {
  user: UserProfile | null;
  onboarding: OnboardingState;
  waiver: WaiverChecklist;
  avatar: AvatarConfig;
  rooms: Room[];
  earnedBadgeIds: string[];
  recentActivity: ActivityItem[];
  scanHistory: ScanResult[];
  stats: PlayerStats;
}
