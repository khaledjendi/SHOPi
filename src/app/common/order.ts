import { Address } from './address';
import { CartProduct } from './../common/Cart';
export class Order {

    constructor(public id?: string,
        public userId?: string,
        public cartProducts?: CartProduct[],
        public totalCartPrice?: number,
        public totalCartDiscount?: number,
        public currency?: string,
        public address?: Address,
        public date?: string) { }
}