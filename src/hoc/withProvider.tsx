'use client';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const withProvider = (Component: FC) => {
    const WrappedComponent = () => {
        return (
            <Provider store={store}><Component /></Provider>
        );
    };

    WrappedComponent.displayName = `withProvider(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default withProvider;