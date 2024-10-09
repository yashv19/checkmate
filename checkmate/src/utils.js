
export const getRandomPlaceholder = () => {
    const randomPlaceholders = [
        `Once upon a time...`,
        `Today I want to...`,
        `I discovered that...`,
        `I can't stop wondering about...`,
        `What excites me most right now is...`,
        `A challenge I'm facing right now is...`,
        `I've been thinking a lot about...`,
        `One thing I'm grateful for today is...`,
        `If I could change one thing, it would be...`,
        `A goal I want to achieve is...`,
        `Something that surprised me recently...`,
        `I've always wanted to learn...`,
        `An important lesson I learned is...`,
        `The best advice I received was...`,
        `If I could travel anywhere, I'd go to...`,
        `Something that made me smile today...`,
        `One thing I can improve on is...`,
        `If money wasn't a factor, I would...`,
        `A person I admire is...`,
        `I'm excited about the future because...`
    ];

    const random = Math.floor(Math.random() * randomPlaceholders.length);
    return randomPlaceholders[random];
}