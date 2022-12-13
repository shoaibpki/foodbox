export interface Items {
    id: number;
	itemName: string;
	categoryName?:string;
	image: string;
	price: number;
	disabled: boolean;
	availableQty: number;
	categoryId?: number;

}
