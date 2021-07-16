export class PossibleAnswer {
    public answer: string;
    public timesVoted: number;

    
    constructor(answer: string, timesVoted: number) {
        this.answer = answer
        this.timesVoted = timesVoted
    }
}