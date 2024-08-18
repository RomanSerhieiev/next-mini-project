const baseURL = 'https://api.themoviedb.org/3';

const url = {
    movie: {
        all: (page: string, sort_by: string, with_genres: string, without_genres: string): string =>
            `${baseURL}/discover/movie?page=${page}&sort_by=${sort_by}&with_genres=${with_genres}&without_genres=${without_genres}`,
        popular: (page: string): string =>
            `${baseURL}/movie/popular?page=${page}`,
        nowPlaying: (page: string): string =>
            `${baseURL}/movie/now_playing?page=${page}`,
        topRated: (page: string): string =>
            `${baseURL}/movie/top_rated?page=${page}`,
        upcoming: (page: string): string =>
            `${baseURL}/movie/upcoming?page=${page}`,
        byId: (id: string): string =>
            `${baseURL}/movie/${id}`,
        genresList:
            `${baseURL}/genre/movie/list`,
        search: (page: string, query: string): string =>
            `${baseURL}/search/movie?page=${page}&query=${query}`,
    }
};

export {
    baseURL,
    url
};