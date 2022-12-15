import {atom} from 'recoil';

export const mordalState = atom<boolean>({
    key : 'mordalState',
    default :false,
})

export const indexState = atom<number>({
    key : 'indexState',
    default : 0,
})