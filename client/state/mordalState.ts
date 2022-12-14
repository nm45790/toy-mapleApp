import {atom} from 'recoil';

export const mordalState = atom<boolean>({
    key : 'mordalState',
    default :false,
})