import { format } from 'date-fns';

export const formatDateWithoutDay = (date) => {
    return format(new Date(date), "LLL d, yyyy").toString()
}

export const formatDateWithDay = (date) => {
    return format(new Date(date), "ccc LLL d, yyyy").toString()
}