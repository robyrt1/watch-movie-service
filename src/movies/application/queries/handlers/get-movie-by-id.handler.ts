import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Movie } from '../../../domain/entities/movie.entity';
import { IMovieRepository, MOVIE_REPOSITORY_TOKEN } from '../../../domain/repositories/movie.repository';
import { GetMovieByIdQuery } from '../impl/get-movie-by-id.query';

@QueryHandler(GetMovieByIdQuery)
export class GetMovieByIdHandler implements IQueryHandler<GetMovieByIdQuery> {
    constructor(
        @Inject(MOVIE_REPOSITORY_TOKEN)
        private readonly movieRepository: IMovieRepository,
    ) { }

    async execute(query: GetMovieByIdQuery): Promise<Movie> {
        const { id } = query;

        const movie = await this.movieRepository.findById(id);

        if (!movie) {
            throw new NotFoundException(`Movie with ID "${id}" not found`);
        }

        return movie;
    }
}