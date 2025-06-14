import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Movie } from '../../../domain/entities/movie.entity';
import { IMovieRepository, MOVIE_REPOSITORY_TOKEN } from '../../../domain/repositories/movie.repository';
import { CreateMovieCommand } from '../impl/create-movie.command';

@CommandHandler(CreateMovieCommand)
export class CreateMovieHandler implements ICommandHandler<CreateMovieCommand> {
    constructor(
        @Inject(MOVIE_REPOSITORY_TOKEN)
        private readonly movieRepository: IMovieRepository,
    ) { }

    async execute(command: CreateMovieCommand): Promise<Movie> {
        const { title, description, director, releaseYear } = command;

        const movie = new Movie({
            title,
            description,
            director,
            releaseYear,
        });

        await this.movieRepository.save(movie);

        return movie;
    }
}