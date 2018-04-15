import { Product } from "./Product";

export class CartProduct {
    public product: Product;
    public amount: number;
    public discountVoucher: string;
    public totalPrice: string;

}