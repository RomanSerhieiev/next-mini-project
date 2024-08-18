import React, { FC } from 'react';
import { movieService } from '@/services/movie.service';
import FooterComponent from '@/components/footer/footer.component';

const FooterContainer: FC = async () => {
    const {genres} = await movieService.genres();
    return <FooterComponent genres={genres} />;
};

export default FooterContainer;