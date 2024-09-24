
export const getRandomPlaceholder = () => {
    const randomPlaceholders = [
        'Once upon a time...',
        'Today I want to...',
        'I discovered that...',
        `I can't stop wondering about...`,
        `What excites me most right now is...`,
        `A challenge I'm facing right now is...`,
        `I've been thinking a lot about...`
    ];

    const random = Math.floor(Math.random() * randomPlaceholders.length);
    return randomPlaceholders[random];
}