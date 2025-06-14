import { randomUUID } from 'crypto';

export enum MovieStatus {
    PROCESSING = 'PROCESSING',
    READY = 'READY',
    FAILED = 'FAILED',
}

export class Movie {
    private readonly _id: string;
    private _title: string;
    private _description: string;
    private _director: string;
    private _releaseYear: number;
    private _status: MovieStatus;
    private _manifestUrl?: string;
    private readonly _createdAt: Date;
    private _updatedAt: Date;

    constructor(params: {
        id?: string;
        title: string;
        description: string;
        director: string;
        releaseYear: number;
        status?: MovieStatus;
        manifestUrl?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this._id = params.id || randomUUID();
        this._title = params.title;
        this._description = params.description;
        this._director = params.director;
        this._releaseYear = params.releaseYear;
        this._status = params.status || MovieStatus.PROCESSING;
        this._manifestUrl = params.manifestUrl;
        this._createdAt = params.createdAt || new Date();
        this._updatedAt = params.updatedAt || new Date();
    }

    // --- Getters para todas as propriedades ---
    get id(): string { return this._id; }
    get title(): string { return this._title; }
    get description(): string { return this._description; }
    get director(): string { return this._director; }
    get releaseYear(): number { return this._releaseYear; }
    get status(): MovieStatus { return this._status; }
    get manifestUrl(): string | undefined { return this._manifestUrl; }
    get createdAt(): Date { return this._createdAt; }
    get updatedAt(): Date { return this._updatedAt; }

    // --- Métodos de negócio ---
    markAsReady(manifestUrl: string) {
        if (!manifestUrl) {
            throw new Error('A URL do manifesto é necessária para marcar um filme como pronto.');
        }
        this._status = MovieStatus.READY;
        this._manifestUrl = manifestUrl;
        this._updatedAt = new Date();
    }
}
