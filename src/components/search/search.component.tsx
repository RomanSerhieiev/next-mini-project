'use client';

import React, { FC, FormEvent, useState } from 'react';
import css from './search.module.css';
import { useRouter, useSearchParams } from 'next/navigation';


const SearchComponent: FC = () => {
    const searchParams = useSearchParams();
    const theme = searchParams.get('light_theme') ? `&light_theme=${searchParams.get('light_theme')}` : '';
    const [query, setQuery] = useState('');
    const router = useRouter();

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        if (query.trim() !== '') {
            router.push(`/movies/search?page=1&query=${query.trim()}${theme}`);
            setQuery('');
        }
    };

    return (
        <form className={css.main} onSubmit={submitHandler}>
            <input type={'text'} value={query} onChange={(e) => setQuery(e.target.value)} />
            <button>Search</button>
        </form>
    );
};

export default SearchComponent;