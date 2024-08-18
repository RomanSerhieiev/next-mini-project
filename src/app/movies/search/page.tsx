import React, { FC } from 'react';
import css from './page.module.css';
import { redirect } from 'next/navigation';
import { movieService } from '@/services/movie.service';
import MoviesCardComponent from '@/components/movie_card/movie_card.component';
import PaginationComponent from '@/components/pagination/pagination.component';

interface IProps {
    searchParams: {
        page?: string,
        query: string,
        light_theme?: string,
    },
}

const Page: FC<IProps> = async ({searchParams}) => {
    const themeMovie = searchParams.light_theme ? `?light_theme=${searchParams.light_theme}` : '';
    if (!searchParams.query) redirect('/movies');
    const page =
        searchParams.page
            ? +searchParams.page <= 0
                ? redirect(`/movies/search?page=1&query=${searchParams.query}`)
                : +searchParams.page <= 500
                    ? searchParams.page
                    : redirect(`/movies/search?page=500&query=${searchParams.query}`)
            : '1';

    const {results: movies, total_pages} = await movieService.search(page, searchParams.query);
    if (movies.length === 0) {
        redirect(`/movies/search?page=${total_pages}&query=${searchParams.query}`);
    }

    const {genres} = await movieService.genres();

    return (
        <div className={searchParams.light_theme ? '' : css.dark}>
            <div className={css.main}>
                {movies.map(movie => <MoviesCardComponent key={movie.id} movie={movie} genres={genres} themeMovie={themeMovie} />)}
            </div>
            <PaginationComponent page={page} total_pages={total_pages} query={`&query=${searchParams.query}`} />
        </div>
    );
};

export default Page;