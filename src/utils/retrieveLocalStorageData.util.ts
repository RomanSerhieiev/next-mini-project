import { ELocalStorageKey } from '@/enums/localStorageKey.enum';

export const retrieveLocalStorageData = <T>(key: ELocalStorageKey) => {
    if (typeof window !== 'undefined') {
        const dataJSON = localStorage.getItem(key) || '';

        if (!dataJSON) {
            return null as T;
        }

        try {
            const data = JSON.parse(dataJSON);
            return data as T;
        } catch (error) {
            console.error('Error parsing JSON from localStorage', error);
            return null as T;
        }
    } else {
        return null as T;
    }
};