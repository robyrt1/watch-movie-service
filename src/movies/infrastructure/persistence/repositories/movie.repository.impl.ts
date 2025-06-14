import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../../domain/entities/movie.entity';
import { IMovieRepository } from '../../../domain/repositories/movie.repository';
import { MovieOrmEntity } from '../entities/movie.orm-entity';

@Injectable()
export class MovieRepositoryImpl implements IMovieRepository {
    constructor(
        @InjectRepository(MovieOrmEntity)
        private readonly ormRepo: Repository<MovieOrmEntity>,
    ) { }

    /**
     * Mapeia a entidade de domínio 'Movie' para a entidade de persistência 'MovieOrmEntity'.
     * Esta é a correção principal para o erro 'null value'.
     */
    private toPersistence(movie: Movie): MovieOrmEntity {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            director: movie.director,
            releaseYear: movie.releaseYear,
            status: movie.status,
            manifestUrl: movie.manifestUrl,
            createdAt: movie.createdAt,
            updatedAt: movie.updatedAt,
        };
    }

    /**
     * Mapeia a entidade de persistência 'MovieOrmEntity' de volta para a entidade de domínio 'Movie'.
     */
    private toDomain(ormEntity: MovieOrmEntity): Movie {
        return new Movie({
            id: ormEntity.id,
            title: ormEntity.title,
            description: ormEntity.description,
            director: ormEntity.director,
            releaseYear: ormEntity.releaseYear,
            status: ormEntity.status,
            manifestUrl: ormEntity.manifestUrl,
            createdAt: ormEntity.createdAt,
            updatedAt: ormEntity.updatedAt,
        });
    }

    async save(movie: Movie): Promise<void> {
        const ormEntity = this.toPersistence(movie);
        await this.ormRepo.save(ormEntity);
    }

    async findById(id: string): Promise<Movie | null> {
        const ormEntity = await this.ormRepo.findOne({ where: { id } });
        if (!ormEntity) {
            return null;
        }
        return this.toDomain(ormEntity);
    }

    async findAll(): Promise<Movie[]> {
        const ormEntities = await this.ormRepo.find();
        return ormEntities.map(this.toDomain);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
