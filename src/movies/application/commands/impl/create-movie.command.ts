export class CreateMovieCommand {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly director: string,
        public readonly releaseYear: number,
    ) { }
}