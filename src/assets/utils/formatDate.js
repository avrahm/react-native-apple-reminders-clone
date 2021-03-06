import { format } from 'date-fns';

export const formatDateWithoutDay = date => format(new Date(date), 'LLL d, yyyy').toString();

export const formatDateWithDay = date => format(new Date(date), 'ccc LLL d, yyyy').toString();
