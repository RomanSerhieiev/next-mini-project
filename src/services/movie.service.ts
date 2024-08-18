import { url } from '@/constants/urls.constant';
import { IResponse } from '@/interfaces/response.interface';
import { options } from '@/constants/options.constant';
import { IMovieDetails } from '@/interfaces/movie_details.interface';
import { IGenre } from '@/interfaces/genre.interface';

export const movieService = {
    all: async (page: string, sort_by: string, with_genres: string, without_genres: string): Promise<IResponse> => {
        return await fetch(url.movie.all(page, sort_by, with_genres, without_genres), options)
            .then(value => value.json());
    },
    popular: async (page: string): Promise<IResponse> => {
        return await fetch(url.movie.popular(page), options)
            .then(value => value.json());
    },
    nowPlaying: async (page: string): Promise<IResponse> => {
        return await fetch(url.movie.nowPlaying(page), options)
            .then(value => value.json());
    },
    topRated: async (page: string): Promise<IResponse> => {
        return await fetch(url.movie.topRated(page), options)
            .then(value => value.json());
    },
    upcoming: async (page: string): Promise<IResponse> => {
        return await fetch(url.movie.upcoming(page), options)
            .then(value => value.json());
    },
    byId: async (id: string): Promise<IMovieDetails> => {
        return await fetch(url.movie.byId(id), options)
            .then(value => value.json());
    },
    genres: async (): Promise<{ genres: IGenre[] }> => {
        return await fetch(url.movie.genresList, options)
            .then(value => value.json());
    },
    search: async (page: string, query: string): Promise<IResponse> => {
        return await fetch(url.movie.search(page, query), options)
            .then(value => value.json());
    },
};