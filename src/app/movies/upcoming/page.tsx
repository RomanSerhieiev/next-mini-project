import type { Metadata } from 'next';
import css from './page.module.css';
import { movieService } from '@/services/movie.service';
import MoviesCardComponent from '@/components/movie_card/movie_card.component';
import { FC } from 'react';
import PaginationComponent from '@/components/pagination/pagination.component';
import { redirect } from 'next/navigation';

interface IProps {
    searchParams: {
        page?: string,
        light_theme?: string,
    },
}

export const metadata: Metadata = {
    title: 'Upcoming Movies — The Movie Database (TMDB)',
    description: 'The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.',
};

const UpcomingMoviesPage: FC<IProps> = async ({searchParams}) => {
    const themeMovie = searchParams.light_theme ? `?light_theme=${searchParams.light_theme}` : '';
    let page;
    if (searchParams.page && +searchParams.page <= 500) {
        page = searchParams.page;
    } else if (searchParams.page && +searchParams.page > 500) {
        redirect(`/movies/upcoming?page=500`);
    } else {
        page = '1';
    }

    const {results: movies, total_pages} = await movieService.upcoming(page);
    if (movies.length === 0) {
        redirect(`/movies/upcoming?page=${total_pages}`);
    }

    const {genres} = await movieService.genres();
    return (
        <div className={searchParams.light_theme ? '' : css.dark}>
            <div className={css.main}>
                {movies.map(movie => <MoviesCardComponent key={movie.id} movie={movie} genres={genres} themeMovie={themeMovie} />)}
            </div>
            <PaginationComponent page={page} total_pages={total_pages} />
        </div>
    );
};

export default UpcomingMoviesPage;