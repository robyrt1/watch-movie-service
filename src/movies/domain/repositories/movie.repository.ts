import { Movie } from '../entities/movie.entity';

// Token para injeção de dependência
export const MOVIE_REPOSITORY_TOKEN = Symbol('MOVIE_REPOSITORY_TOKEN');

export interface IMovieRepository {
    save(movie: Movie): Promise<void>;
    findById(id: string): Promise<Movie | null>;
    findAll(): Promise<Movie[]>;
    delete(id: string): Promise<void>;
}