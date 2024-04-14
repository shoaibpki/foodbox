import { Items } from './items';
export interface Category {
    $key?: string;
    id?: any;
    disabled?: boolean;
    categoryName: string;
    citem?: Items[];
}
