import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { isUndefined } from 'lodash';
import { CACHE_KEY } from 'src/movies/infrastructure/shared/constants/cacheKeys';
import { CacheTtlSeconds } from 'src/movies/infrastructure/shared/constants/cacheTTL.constants';
import { Movie } from '../../../domain/entities/movie.entity';
import { IMovieRepository, MOVIE_REPOSITORY_TOKEN } from '../../../domain/repositories/movie.repository';
import { GetMovieQuery } from '../impl/get-all-movies.query';

@QueryHandler(GetMovieQuery)
export class GetMovieHandler implements IQueryHandler<GetMovieQuery> {
    constructor(
        @Inject(MOVIE_REPOSITORY_TOKEN)
        private readonly movieRepository: IMovieRepository,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async execute(query: GetMovieQuery): Promise<Movie[]> {

        const movieInCache = await this.cacheManager.get<Movie[]>(
            CACHE_KEY.MOVIE_ALL,
        );

        if (isUndefined(movieInCache)) {
            const movie = await this.movieRepository.findAll();
            await this.cacheManager.set(CACHE_KEY.MOVIE_ALL, movie, CacheTtlSeconds.TEN_MINUTES);

            if (!movie) {
                throw new NotFoundException(`Movies not found`);
            }
            return movie;
        }

        return movieInCache;
    }
}