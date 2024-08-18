'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, Chip } from '@mui/material';
import css from './footer.module.css';
import { useSearchParams } from 'next/navigation';
import { IGenre } from '@/interfaces/genre.interface';

interface IProps {
    genres: IGenre[];
}

const FooterComponent: FC<IProps> = ({genres}) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('light_theme') ? `?light_theme=${searchParams.get('light_theme')}` : '';
    const genreQuery = searchParams.get('light_theme') ? `&light_theme=${searchParams.get('light_theme')}` : '';
    return (
        <footer>
            <nav className={searchParams.get('light_theme') ? css.main : `${css.main} ${css.dark}`}>
                <ul>
                    <li>
                        <Link href={'/' + query}>
                            <Image src={'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'}
                                   alt="The Movie Database (TMDB)" width="154"
                                   height="94" />
                        </Link>
                    </li>
                    <li>
                        <h4>Movies</h4>
                        <Link href={'/movies' + query}>All movies</Link>
                        <Link href={'/movies/popular' + query}>Popular</Link>
                        <Link href={'/movies/top_rated' + query}>Top rated</Link>
                        <Link href={'/movies/now_playing' + query}>Now playing</Link>
                        <Link href={'/movies/upcoming' + query}>Upcoming</Link>
                    </li>
                    <li>
                        <h4>Genres</h4>
                        <div className={css.genres}>
                            {genres.map(genre => <Link key={genre.id} href={`/movies?page=1&with_genres=${genre.id}` + genreQuery}>{genre.name}</Link>)}
                        </div>
                    </li>
                    <Link href={'/account' + query}>
                        <Chip avatar={<Avatar />} label={'User'} color={'primary'} />
                    </Link>
                </ul>
            </nav>
        </footer>
    );
};

export default FooterComponent;