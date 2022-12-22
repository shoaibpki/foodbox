export interface Iuser {
	id: number;
    name: string;
	email: string;
	disabled?: boolean;
	role: string;
	password: string;
	cartItems: cartItems[]

}

interface cartItems {
    id: number;
	price: number;
	quantity: number;
	image?: string;
	userId: number;
	itemId?: number;

}

