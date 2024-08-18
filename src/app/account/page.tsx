import css from './page.module.css';
import type { Metadata } from 'next';
import { FC } from 'react';

interface IProps {
    searchParams: {
        light_theme?: string,
    },
}

export const metadata: Metadata = {
    title: 'User account - The Movie Database (TMDB)',
    description: 'The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.',
};

const AccountPage: FC<IProps> = ({searchParams}) => {
    return (
        <main className={searchParams.light_theme ? css.main : `${css.main} ${css.dark}`}>
            <h1>Account page</h1>
        </main>
    );
};

export default AccountPage;