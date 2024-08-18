import { IGenre } from '@/interfaces/genre.interface';
import { ICollection } from '@/interfaces/collection.interface';
import { ICompany } from '@/interfaces/company.interface';
import { ICountry } from '@/interfaces/country.interface';
import { ILanguage } from '@/interfaces/language.interface';

export interface IMovieDetails {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: ICollection,
    budget: number,
    genres: IGenre[],
    homepage: string,
    id: number,
    imdb_id: string,
    origin_country: string[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ICompany[],
    production_countries: ICountry[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: ILanguage[],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}