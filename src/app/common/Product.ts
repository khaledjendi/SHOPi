import { Price } from './Price';

export class Product {
    public id: string;
    public sku;
    public slug;
    public name: string;
    public collections;
    public categories;
    public brands;
    public brand: string;
    public price: Price;
    public images: string[] = [];
    public mainImagePng: string;
    public discount: number; 
    public rating: number;
    public color: string;
    public colorCode: string;
    public fit: string;
    public newArrival: boolean;
    public reviews: number;
    public description: string; 

    constructor() { }
}