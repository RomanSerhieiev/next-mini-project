import { IMovie } from '@/interfaces/movie.interface';

export interface IResponse {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number
}