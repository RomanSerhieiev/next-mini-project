import { useDispatch } from 'react-redux';
import { store } from '@/store/store';

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();