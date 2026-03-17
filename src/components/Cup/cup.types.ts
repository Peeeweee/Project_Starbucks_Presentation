export type CupState = {
  fillLevel: number;        // 0 to 100
  isSteaming: boolean;
  isWriting: boolean;
  writeText: string;
  crackLevel: 0 | 1 | 2;   // 0=none, 1=light, 2=heavy
  isHealing: boolean;
  isOverflowing: boolean;
  isGlowing: boolean;
  glowColor: string;        // hex color
  tilt: number;             // degrees
  isShaking: boolean;
}

export interface CupProps {
  state: CupState;
  size?: number;
  onHealComplete?: () => void;
  currentSection?: number;
  healingProgress?: number;
}
