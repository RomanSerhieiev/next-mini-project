import { createSlice } from '@reduxjs/toolkit';
import { ELocalStorageKey } from '@/enums/localStorageKey.enum';
import { saveLocalStorage } from '@/utils/saveLocalStorageData.util';
import { retrieveLocalStorageData } from '@/utils/retrieveLocalStorageData.util';

interface IThemeSlice {
    checked: boolean,
}

const initialState: IThemeSlice = {
    checked: retrieveLocalStorageData<boolean>(ELocalStorageKey.DARK_THEME),
};

export const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        themeSwitch: (state) => {
            state.checked = !state.checked;
            saveLocalStorage<boolean>(ELocalStorageKey.DARK_THEME, state.checked);
        }
    },
});

export const {themeSwitch} = themeSlice.actions;
