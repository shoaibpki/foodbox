import { Cart } from "./cart";

export interface Sales {
    $key: any;
    cartItems: Cart[];
    gtotal?: number;
}
