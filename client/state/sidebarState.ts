import {atom} from 'recoil';

export const sidebarState = atom<boolean>({
    key : 'sidebarState',
    default :true,
})

export const sidebarUsed = atom<Number>({
    key : 'sidebarUsed',
    default : 1,
})