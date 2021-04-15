export interface Answer
{
    /**
     * The answer text.
     */
    text: string;

    /**
     * [OPTIONAL] Whether or not this answer is the correct one.
     */
    correct?: boolean;

    /**
     * [OPTIONAL] Whether or not this answer was chosen.
     */
    chosen?: boolean;
}

export interface Question
{
    /**
     * The question text.
     */
    text: string;

    /**
     * The question's answers.
     */
    answers: Answer[];

    /**
     * [OPTIONAL] true if the answers should be randomized.
     */
    randomize?: boolean;
}

export interface HistoryItem
{
    startTime: number;

    endTime: number;

    score: number;

    complete?: boolean;

    questions: Question[];
}