import { Cart } from "./cart";

export interface Iuser {
	$key?: string;
	id: number;
    name: string;
	email: string;
	disabled?: boolean;
	role: string;
	password: string;
	cartItems?: Cart[]

}

// interface cartItems {
//     id: number;
// 	price: number;
// 	quantity: number;
// 	image?: string;
// 	userId: number;
// 	itemId?: number;

// }

