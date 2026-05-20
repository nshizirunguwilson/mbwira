export type Role = "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export type RiskLevel = "none" | "low" | "medium" | "high" | "imminent";

export interface RiskAssessment {
  level: RiskLevel;
  reason: string;
}

export const RISK_LEVELS: readonly RiskLevel[] = [
  "none",
  "low",
  "medium",
  "high",
  "imminent",
] as const;

export function shouldBreakConversation(level: RiskLevel): boolean {
  return level === "medium" || level === "high" || level === "imminent";
}
