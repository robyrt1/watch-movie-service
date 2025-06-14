import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieRequestDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    director: string;

    @IsNumber()
    releaseYear: number;
}