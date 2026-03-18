export interface TypingStats {
    wpm: number;
    accuracy: number;
    correctChars: number;
    incorrectChars: number;
    timeElapsed: number;
}

export interface GameState {
    isActive: boolean;
    isComplete: boolean;
    startTime: number | null;
}