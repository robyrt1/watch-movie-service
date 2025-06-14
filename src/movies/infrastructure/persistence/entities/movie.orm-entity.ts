import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MovieStatus } from '../../../domain/entities/movie.entity';

@Entity('movies')
export class MovieOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column()
    director: string;

    @Column()
    releaseYear: number;

    @Column({ type: 'enum', enum: MovieStatus })
    status: MovieStatus;

    @Column({ type: 'text', nullable: true })
    manifestUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}