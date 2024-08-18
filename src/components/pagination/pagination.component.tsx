'use client';

import React, { FC } from 'react';
import css from './pagination.module.css';
import { useRouter } from 'next/navigation';

interface IProps {
    page: string,
    sort_by?: string,
    with_genres?: string | string[],
    without_genres?: string | string[],
    query?: string,
    total_pages: number,
}

const PaginationComponent: FC<IProps> = ({page, with_genres, sort_by, without_genres, query, total_pages}) => {
    const router = useRouter();

    const pageHandler = (page: number) => {
        if (sort_by) {
            if (with_genres) {
                if (without_genres) {
                    router.push(`?page=${page}${sort_by}${with_genres}${without_genres}`);
                } else {
                    router.push(`?page=${page}${sort_by}${with_genres}`);
                }
            } else if (without_genres) {
                router.push(`?page=${page}${sort_by}${without_genres}`);
            } else {
                router.push(`?page=${page}${sort_by}`);
            }
        } else if (with_genres) {
            if (without_genres) {
                router.push(`?page=${page}${with_genres}${without_genres}`);
            } else {
                router.push(`?page=${page}${with_genres}`);
            }
        } else if (without_genres) {
            router.push(`?page=${page}${without_genres}`);
        } else if (query) {
            router.push(`?page=${page}${query}`);
        } else {
            router.push(`?page=${page}`);
        }
    };

    return (
        page && <div className={css.Container}>
            {
                +page > 2 &&
              <button className={css.Item1} onClick={() => pageHandler(1)}>
                  {1}
              </button>
            }
            {
                +page > 1 &&
              <button className={css.Item2} onClick={() => pageHandler(+page - 1)}>
                  {+page - 1}
              </button>
            }
          <div className={css.Item3}>{page}</div>
            {
                +page < (total_pages <= 500 ? total_pages : 500) &&
              <button className={css.Item4} onClick={() => pageHandler(+page + 1)}>
                  {+page + 1}
              </button>
            }
            {
                +page < (total_pages <= 500 - 1 ? total_pages - 1 : 500 - 1) &&
              <button className={css.Item5} onClick={() => pageHandler(total_pages <= 500 ? total_pages : 500)}>
                  {total_pages <= 500 ? total_pages : 500}
              </button>
            }
        </div>
    );
};

export default PaginationComponent;