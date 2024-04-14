export interface Cart {
	$key?: any;
    id: number;
	price: number;
	quantity: number;
	image?: string;
	userId: any;
	itemId?: any;
	catagoryId?: any;
	itemName?: string;
	subtotal?: number;
	saleDate: any;
	paymentMode?: string;
}
