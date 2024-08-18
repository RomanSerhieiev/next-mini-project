'use client';

import React, { FC } from 'react';
import css from './genres.module.css';
import { IGenre } from '@/interfaces/genre.interface';
import { Badge } from 'reactstrap';
import { useRouter } from 'next/navigation';

interface IProps {
    genres: IGenre[],
    sort_by?: string,
    with_genres?: string,
    without_genres?: string,
}

const GenresComponent: FC<IProps> = ({genres, sort_by, with_genres, without_genres}) => {
    const router = useRouter();

    const withGenreHandler = (genre: string) => {
        const withGenres =
            with_genres
                ? with_genres.split(',').includes(genre)
                    ? with_genres.split(',').filter(id => id !== genre).length > 0
                        ? `&with_genres=${with_genres.split(',').filter(id => id !== genre).toString()}`
                        : ''
                    : `&with_genres=${with_genres},${genre}`
                : `&with_genres=${genre}`;

        const withoutGenres =
            without_genres
                ? without_genres.split(',').includes(genre)
                    ? without_genres.split(',').filter(id => id !== genre).length > 0
                        ? `&without_genres=${without_genres.split(',').filter(id => id !== genre).toString()}`
                        : ''
                    : `&without_genres=${without_genres}`
                : `&without_genres=${genre}`;

        if (sort_by) {
            if (without_genres) {
                router.push(`?page=1${sort_by}${withGenres}${withoutGenres}`);
            } else {
                router.push(`?page=1${sort_by}${withGenres}`);
            }
        } else if (without_genres) {
            router.push(`?page=1${withGenres}${withoutGenres}`);
        } else {
            router.push(`?page=1${withGenres}`);
        }
    };

    const withoutGenreHandler = (genre: string) => {
        const withGenres =
            with_genres
                ? with_genres.split(',').includes(genre)
                    ? with_genres.split(',').filter(id => id !== genre).length > 0
                        ? `&with_genres=${with_genres.split(',').filter(id => id !== genre).toString()}`
                        : ''
                    : `&with_genres=${with_genres}`
                : `&with_genres=${genre}`;

        const withoutGenres =
            without_genres
                ? without_genres.split(',').includes(genre)
                    ? without_genres.split(',').filter(id => id !== genre).length > 0
                        ? `&without_genres=${without_genres.split(',').filter(id => id !== genre).toString()}`
                        : ''
                    : `&without_genres=${without_genres},${genre}`
                : `&without_genres=${genre}`;

        if (sort_by) {
            if (with_genres) {
                router.push(`?page=1${sort_by}${withGenres}${withoutGenres}`);
            } else {
                router.push(`?page=1${sort_by}${withoutGenres}`);
            }
        } else if (with_genres) {
            router.push(`?page=1${withGenres}${withoutGenres}`);
        } else {
            router.push(`?page=1${withoutGenres}`);
        }
    };

    const withAllGenres = () => {
        if (sort_by) {
            router.push(`?page=1${sort_by}`);
        } else {
            router.push(`?page=1`);
        }
    };

    const withoutAllGenres = () => {
        if (sort_by) {
            router.push(`?page=1${sort_by}&without_genres=${genres.map(genre => genre.id).join(',')}`);
        } else {
            router.push(`?page=1&without_genres=${genres.map(genre => genre.id).join(',')}`);
        }
    };

    return (
        <div className={css.main}>
            <div className={css.genres}>
                <button onClick={withAllGenres}>All genres</button>
                <div>
                    {genres.map(genre =>
                        <Badge onClick={() => withGenreHandler(genre.id.toString())} key={genre.id} color={
                            with_genres
                                ? with_genres.split(',').find(id => +id === genre.id)
                                    ? 'success'
                                    : 'secondary'
                                : without_genres
                                    ? without_genres.split(',').find(id => +id === genre.id)
                                        ? 'secondary'
                                        : 'success'
                                    : 'success'
                        } pill>
                            {genre.name}
                        </Badge>
                    )}
                </div>
            </div>
            <div className={css.genres}>
                <button onClick={withoutAllGenres}>Without genres</button>
                <div>
                    {genres.map(genre =>
                        <Badge onClick={() => withoutGenreHandler(genre.id.toString())} key={genre.id} color={
                            without_genres ? without_genres.split(',').find(id => +id === genre.id) ? 'danger' : 'secondary' : 'secondary'
                        } pill>
                            {genre.name}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenresComponent;