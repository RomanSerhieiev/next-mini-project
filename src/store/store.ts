import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from '@/store/slices/theme.slice';

export const store = configureStore({
    reducer: {
        themeSlice: themeSlice.reducer
    }
});