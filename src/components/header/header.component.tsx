'use client';

import React, { FC } from 'react';
import css from './header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, Chip } from '@mui/material';
import SearchComponent from '@/components/search/search.component';
import SwitcherComponent from '@/components/switcher/switcher.component';
import { useSearchParams } from 'next/navigation';

const HeaderComponent: FC = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('light_theme') ? `?light_theme=${searchParams.get('light_theme')}` : ''
    return (
        <header>
            <nav className={searchParams.get('light_theme') ? css.main : `${css.main} ${css.dark}`}>
                <ul>
                    <li>
                        <Link href={'/' + query}>
                            <Image src={'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'}
                                   alt="The Movie Database (TMDB)" width="154"
                                   height="20" />
                        </Link>
                    </li>
                    <li>
                        <Link href={'/movies' + query}>All movies</Link>
                        <Link href={'/movies/popular' + query}>Popular</Link>
                        <Link href={'/movies/top_rated' + query}>Top rated</Link>
                        <Link href={'/movies/now_playing' + query}>Now playing</Link>
                        <Link href={'/movies/upcoming' + query}>Upcoming</Link>
                    </li>
                </ul>
                <SearchComponent />
                <SwitcherComponent />
                <Link href={'/account' + query}>
                    <Chip avatar={<Avatar />} label={'User'} color={'primary'} />
                </Link>
            </nav>
        </header>
    );
};

export default HeaderComponent;