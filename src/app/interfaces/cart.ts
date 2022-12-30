export interface Cart {
    id: number;
	price: number;
	quantity: number;
	image?: string;
	userId: number;
	itemId?: number;
	itemName?: string;
	subtotal?: number;
	saleDate: Date;
}
