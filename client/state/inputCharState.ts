import {atom} from 'recoil';

type chars = {
    name: string;
}
// type charsList = chars[]

export const inputCharState = atom<chars[]>({
    key : 'inputCharState',
    default :[],
})