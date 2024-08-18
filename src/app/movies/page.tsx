import { movieService } from '@/services/movie.service';
import css from './page.module.css';
import type { Metadata } from 'next';
import MovieCardComponent from '@/components/movie_card/movie_card.component';
import { FC } from 'react';
import PaginationComponent from '@/components/pagination/pagination.component';
import { redirect } from 'next/navigation';
import SortingComponent from '@/components/sorting/sorting.component';
import GenresComponent from '@/components/genres/genres.component';

interface IProps {
    searchParams: {
        page?: string,
        sort_by?: string,
        with_genres?: string,
        without_genres?: string,
        light_theme?: string,
    },
}

export const metadata: Metadata = {
    title: 'Popular Movies — The Movie Database (TMDB)',
    description: 'The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.',
};

const PopularMoviesPage: FC<IProps> = async ({searchParams}) => {
    const sort_by = searchParams.sort_by ? `&sort_by=${searchParams.sort_by}` : '';
    const with_genres = searchParams.with_genres ? `&with_genres=${searchParams.with_genres}` : '';
    const without_genres = searchParams.without_genres ? `&without_genres=${searchParams.without_genres}` : '';
    const theme = searchParams.light_theme ? `&light_theme=${searchParams.light_theme}` : ''
    const themeMovie = searchParams.light_theme ? `?light_theme=${searchParams.light_theme}` : '';
    const page = searchParams.page
        ? +searchParams.page <= 0
            ? redirect(`/movies?page=1${sort_by}${with_genres}${without_genres}${theme}`)
            : +searchParams.page <= 500
                ? searchParams.page
                : redirect(`/movies?page=500${sort_by}${with_genres}${without_genres}${theme}`)
        : '1';

    if (searchParams.with_genres) {
        const genres = Array.from(new Set(searchParams.with_genres.split(','))).join(',');

        if (genres !== searchParams.with_genres) {
            redirect(`/movies?page=${page}${sort_by}&with_genres=${genres}${without_genres}${theme}`);
        }
    }

    if (searchParams.without_genres) {
        const genres = Array.from(new Set(searchParams.without_genres.split(','))).join(',');

        if (genres !== searchParams.without_genres) {
            redirect(`/movies?page=${page}${sort_by}${with_genres}&without_genres=${genres}${theme}`);
        }
    }

    const {results: movies, total_pages} = await movieService.all(
        page,
        sort_by,
        with_genres,
        without_genres,
    );
    if (movies.length === 0) {
        redirect(`/movies?page=${total_pages}${sort_by}${with_genres}${theme}`);
    }

    const {genres} = await movieService.genres();

    return (
        <div className={searchParams.light_theme ? '' : css.dark}>
            <div className={css.filters}>
                <SortingComponent
                    sort_by={sort_by}
                    with_genres={with_genres}
                    without_genres={without_genres}
                />
                <GenresComponent
                    genres={genres}
                    sort_by={sort_by}
                    with_genres={searchParams.with_genres}
                    without_genres={searchParams.without_genres}
                />
            </div>
            <div className={css.main}>
                {movies.map(movie => <MovieCardComponent key={movie.id} movie={movie} genres={genres} themeMovie={themeMovie} />)}
            </div>
            <PaginationComponent
                page={page}
                sort_by={sort_by}
                with_genres={with_genres}
                without_genres={without_genres}
                total_pages={total_pages}
            />
        </div>
    );
};

export default PopularMoviesPage;