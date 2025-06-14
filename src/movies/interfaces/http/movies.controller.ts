import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMovieQuery } from 'src/movies/application/queries/impl/get-all-movies.query';
import { AuthGuard } from 'src/movies/infrastructure/http/guards/auth.guard';
import { S3_SERVICE, S3Service } from 'src/movies/infrastructure/services/s3.service';
import { CreateMovieCommand } from '../../application/commands/impl/create-movie.command';
import { GetMovieByIdQuery } from '../../application/queries/impl/get-movie-by-id.query';
import { CreateMovieRequestDto } from './dtos/create-movie.request.dto';

@Controller('movies')
@UseGuards(AuthGuard)
export class MoviesController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        @Inject(S3_SERVICE) private readonly s3Service: S3Service
    ) { }

    @Post()
    async create(@Body() dto: CreateMovieRequestDto) {
        const { title, description, director, releaseYear } = dto;
        return this.commandBus.execute(
            new CreateMovieCommand(title, description, director, releaseYear)
        );
    }

    @Post('upload-request')
    async getUploadUrl(@Body() body: { fileName: string; fileType: string }) {
        return this.s3Service.getPresignedUploadUrl(body.fileName, body.fileType);
    }

    @Get()
    async findAll() {
        return this.queryBus.execute(new GetMovieQuery());
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.queryBus.execute(new GetMovieByIdQuery(id));
    }

}