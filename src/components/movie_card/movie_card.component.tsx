import React, { FC } from 'react';
import css from './movie_card.module.css';
import { IMovie } from '@/interfaces/movie.interface';
import Link from 'next/link';
import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { Badge } from 'reactstrap';
import { IGenre } from '@/interfaces/genre.interface';

interface IProps {
    movie: IMovie,
    genres: IGenre[],
    themeMovie: string,
}

const MovieCardComponent: FC<IProps> = ({movie, genres, themeMovie}) => {
    return (
        <Card className={css.main} sx={{maxWidth: 345}}>
            <Link href={`/movies/${movie.id}${themeMovie}`}>
                <CardActionArea>
                    {movie.poster_path ? <CardMedia
                        component={'img'}
                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    /> : <div></div>}
                    <CardContent className={css.content}>
                        <Typography gutterBottom variant="h5" component="h4" color={'text.primary'}>
                            {movie.title}
                        </Typography>
                        <Rating
                            value={movie.vote_average}
                            max={10}
                            precision={0.1}
                            size={'large'}
                            readOnly
                        />
                        <div className={css.genres}>
                            {movie.genre_ids.map(genre_id =>
                                <Badge key={genre_id} color={'primary'} pill>
                                    {genres.find(genre => genre.id === genre_id)?.name}
                                </Badge>
                            )}
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            {movie.release_date}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};

export default MovieCardComponent;