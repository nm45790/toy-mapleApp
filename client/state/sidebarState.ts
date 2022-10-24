import {atom} from 'recoil';

export const sidebarState = atom<boolean>({
    key : 'sidebarState',
    default :true,
})
