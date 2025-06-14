import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Movie } from '../../../domain/entities/movie.entity';
import { IMovieRepository, MOVIE_REPOSITORY_TOKEN } from '../../../domain/repositories/movie.repository';
import { GetMovieQuery } from '../impl/get-all-movies.query';

@QueryHandler(GetMovieQuery)
export class GetMovieHandler implements IQueryHandler<GetMovieQuery> {
    constructor(
        @Inject(MOVIE_REPOSITORY_TOKEN)
        private readonly movieRepository: IMovieRepository,
    ) { }

    async execute(query: GetMovieQuery): Promise<Movie[]> {

        const movie = await this.movieRepository.findAll();

        if (!movie) {
            throw new NotFoundException(`Movies not found`);
        }

        return movie;
    }
}