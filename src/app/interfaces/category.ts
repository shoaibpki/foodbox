import { Items } from './items';
export interface Category {
    id?: number;
    categoryName: string;
    citem?: Items[];
}
