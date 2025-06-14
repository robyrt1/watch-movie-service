import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importe ConfigService
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisOptions } from './movies/infrastructure/cache/redis.manager';
import { MovieOrmEntity } from './movies/infrastructure/persistence/entities/movie.orm-entity';
import { MoviesModule } from './movies/movies.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // envFilePath: '.env',
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [MovieOrmEntity],
        synchronize: true,
      })
    }
    ,
    inject: [ConfigService],

  }),
  CacheModule.registerAsync(RedisOptions),
    MoviesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
