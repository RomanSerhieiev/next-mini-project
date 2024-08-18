import { ELocalStorageKey } from '@/enums/localStorageKey.enum';

export const saveLocalStorage = <T>(key: ELocalStorageKey, data: T) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        console.warn('Attempted to use localStorage during SSR');
    }
};