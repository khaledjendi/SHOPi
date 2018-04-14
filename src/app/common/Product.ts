
export class Product {
    public id: string;
    public sku;
    public slug;
    public name: string;
    public collections;
    public categories;
    public brands;
    public price: string;
    public formattedPrice: string;
    public mainImage: string;
    public images;
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