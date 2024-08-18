'use client';

import React, { ChangeEvent, FC } from 'react';
import css from './sorting.module.css';
import { useRouter } from 'next/navigation';

interface IProps {
    sort_by?: string,
    with_genres?: string | string[],
    without_genres?: string | string[],
}

const SortingComponent: FC<IProps> = ({with_genres, without_genres, sort_by}) => {
    const router = useRouter();

    const sortHandler = (sort_by: ChangeEvent<HTMLSelectElement>) => {
        if (with_genres) {
            if (without_genres) {
                router.push(`?page=1${sort_by.target.value}${with_genres}${without_genres}`);
            } else {
                router.push(`?page=1${sort_by.target.value}${with_genres}`);
            }
        } else if (without_genres) {
            router.push(`?page=1${sort_by.target.value}${without_genres}`);
        } else {
            router.push(`?page=1${sort_by.target.value}`);
        }
    };

    return (
        <form className={css.main}>
            <label>Sort by: {}
                <select value={sort_by ? sort_by : ''} onChange={sortHandler}>
                    <option value={'&sort_by=original_title.asc'}>Original title ▲</option>
                    <option value={'&sort_by=original_title.desc'}>Original title ▼</option>
                    <option value={'&sort_by=popularity.asc'}>Popularity ▲</option>
                    <option value={''}>Popularity ▼</option>
                    <option value={'&sort_by=revenue.asc'}>Revenue ▲</option>
                    <option value={'&sort_by=revenue.desc'}>Revenue ▼</option>
                    <option value={'&sort_by=primary_release_date.asc'}>Primary release date ▲</option>
                    <option value={'&sort_by=primary_release_date.desc'}>Primary release date ▼</option>
                    <option value={'&sort_by=title.asc'}>Title ▲</option>
                    <option value={'&sort_by=title.desc'}>Title ▼</option>
                    <option value={'&sort_by=vote_average.asc'}>Vote average ▲</option>
                    <option value={'&sort_by=vote_average.desc'}>Vote average ▼</option>
                    <option value={'&sort_by=vote_count.asc'}>Vote count ▲</option>
                    <option value={'&sort_by=vote_count.desc'}>Vote count ▼</option>
                </select>
            </label>
        </form>
    );
};

export default SortingComponent;