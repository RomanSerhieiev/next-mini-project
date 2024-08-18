import type { Metadata } from 'next';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FC, ReactNode } from 'react';
import HeaderComponent from '@/components/header/header.component';
import FooterContainer from '@/components/footer/container/footerContainer.component';

export const metadata: Metadata = {
    title: 'The Movie Database (TMDB)',
    description: 'The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.',
};

interface IProps {
    children: ReactNode;
}

const RootLayout: FC<IProps> = ({children}) => {
    return (
        <html lang="en">
        <body>
        <HeaderComponent />
        {children}
        <FooterContainer />
        </body>
        </html>
    );
};

export default RootLayout;
