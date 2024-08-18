import React, { FC } from 'react';
import css from './page.module.css';
import type { Metadata } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { movieService } from '@/services/movie.service';
import { Badge, Progress } from 'reactstrap';
import Link from 'next/link';

interface IProps {
    searchParams: {
        light_theme?: string,
    },
}

export const generateMetadata = async ({params: {id}}: Params): Promise<Metadata> => {
    const movie = await movieService.byId(id);
    return {
        title: `${movie.title} — The Movie Database (TMDB)`,
        description: `${movie.overview}`,
    };
};

const MoviePage: FC<Params & IProps> = async ({params: {id}, searchParams}) => {
    const theme = searchParams.light_theme ? `&light_theme=${searchParams.light_theme}` : '';
    const movie = await movieService.byId(id);
    let color;
    if (movie.vote_average >= 8) color = 'success';
    else if (movie.vote_average >= 7.5) color = 'primary';
    else if (movie.vote_average >= 7) color = 'info';
    else if (movie.vote_average >= 6.5) color = 'warning';
    else color = 'danger';

    return (
        <div className={css.main} style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}>
            <div className={css.container}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div>
                    <h2>{movie.title}</h2>
                    <div className={css.info}>
                        <div>{movie.release_date}</div>
                        <div>•</div>
                        {movie.genres.map(genre =>
                            <Link key={genre.id} href={`/movies?page=1&with_genres=${genre.id}${theme}`}>
                                <Badge color={'warning'} pill>
                                    {genre.name}
                                </Badge>
                            </Link>
                        )}
                        <div>•</div>
                        <div>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</div>
                    </div>
                    <Progress value={movie.vote_average * 10} color={color} animated style={{
                        height: '20px',
                        maxWidth: '500px',
                    }}>{Math.floor(movie.vote_average * 10)}% ({movie.vote_count} voters)</Progress>
                    <i className={css.i}>{movie.tagline}</i>
                    <h4>Overview</h4>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;