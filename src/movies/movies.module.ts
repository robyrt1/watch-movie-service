import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from './interfaces/http/movies.controller';

import { CreateMovieHandler } from './application/commands/handlers/create-movie.handler';
import { GetMovieByIdHandler } from './application/queries/handlers/get-movie-by-id.handler';

import { MovieOrmEntity } from './infrastructure/persistence/entities/movie.orm-entity';
import { MovieRepositoryImpl } from './infrastructure/persistence/repositories/movie.repository.impl';
import { S3_SERVICE, S3Service } from './infrastructure/services/s3.service';

import { GetMovieHandler } from './application/queries/handlers/get-all-movies.handler';
import { MOVIE_REPOSITORY_TOKEN } from './domain/repositories/movie.repository';

const commandHandlers = [CreateMovieHandler];
const queryHandlers = [GetMovieByIdHandler, GetMovieHandler];
const services: Provider[] = [{
    provide: S3_SERVICE, useClass: S3Service
}]
const repositories: Provider[] = [
    {
        provide: MOVIE_REPOSITORY_TOKEN,
        useClass: MovieRepositoryImpl,
    },
];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([MovieOrmEntity]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h' },
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [MoviesController],
    providers: [
        ...commandHandlers,
        ...queryHandlers,
        ...repositories,
        ...services
    ],
})
export class MoviesModule { }