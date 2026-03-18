export function calculateWPM(
    correctChars: number,
    timeElapsedSeconds: number
): number {
    if (timeElapsedSeconds === 0) return 0;

    // Standard: 1 word = 5 characters
    const words = correctChars / 5;
    const minutes = timeElapsedSeconds / 60;

    return Math.round(words / minutes);
}

export function calculateAccuracy(
    correctChars: number,
    totalChars: number
): number {
    if (totalChars === 0) return 100;

    return Math.round((correctChars / totalChars) * 100);
}

export function getCharStats(userInput: string, targetText: string) {
    let correctChars = 0;
    let incorrectChars = 0;

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === targetText[i]) {
            correctChars++
        } else {
            incorrectChars++;
        }
    }

    return {
        correctChars,
        incorrectChars,
        totalChars: userInput.length,
    }
}