import { Product } from './../Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductsService, CallOperator } from './../../products.service';
import { PageType } from './../common-header/common-header.component';

@Component({
  selector: 'app-clothes-collection',
  templateUrl: './clothes-collection.component.html',
  styleUrls: ['./clothes-collection.component.scss']
})
export class ClothesCollectionComponent implements OnInit {
  private type: PageType;
  collectionHeader;

  brandControl = new FormControl();
  brandsList = ['Asics', 'Bertoni', 'Dale Of Norway', 'Diesel Men', 'Edwin', 'G-Star', 'GANT', 'GANT Rugger', 'Boss'];

  sizeControl = new FormControl();
  sizeGroups = [
    {
      name: 'Small',
      size: ['XS', 'S']
    }, {
      name: 'Medium',
      size: ['M']
    }, {
      name: 'Large',
      size: ['L', 'XL', 'XXL', 'XXL']
    }

  ];

  colorControl = new FormControl();
  colorsList = [
    {
      name: 'Black',
      code: '#000000'
    }, {
      name: 'Blue',
      code: '#0000FF'
    }, {
      name: 'Gray',
      code: '#A4A4A4'
    }, {
      name: 'White',
      code: '#FFFFFF'
    }, {
      name: 'Brown',
      code: '#8A2908'
    }, {
      name: 'Red',
      code: '#FF0000'
    }, {
      name: 'Green',
      code: '#2EFE2E'
    }, {
      name: 'Orange',
      code: '##FF8000'
    }];

  priceCurrency = "kr";
  minPrice = "0";
  maxPrice = "5000";
  priceRange = "1350, 3500";
  perPage = 35;

  topsCollection = ['Shirts', 'T-Shirts', 'Knitwear', 'Weatshirts & Hoodies', 'Polo Shirts']
  outerwareCollection = ['Jackets', 'Coats', 'Blazers', 'Rainwear', 'Vests']
  suitsCollection = ['Suits', 'Tuxedos', 'Blazers', 'Trousers', 'Waistcoats', 'Accessories']
  trousersCollection = ['Chinos', 'Casual', 'Formal', 'Sweat Pants']
  jeansCollection = ['Skinny', 'Slim', 'Regular', 'Relaxed']

  products: Product[] = []; 


  constructor(private route: ActivatedRoute, private productService: ProductsService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let type = params.get('type');
      this.type = (type) ? PageType[type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()] : null;
      switch (this.type) {
        case PageType.Men:
          this.collectionHeader = "url('../../assets/img/collection/men/banner_1.jpg')";
          this.getAllProducts();
          break;
      }
    })
  }

  getType() {
    return PageType[this.type].toString();
  }

  getAllProducts() {
    let productsService = this.productService.callGet(CallOperator.AllProducts);
    if (productsService instanceof Promise) {
      productsService.then((promise) => promise.subscribe((products) => {
        //console.log("promise productsService", products);
        this.createProducts(products.data);
      }))
    }
    else {
      productsService.subscribe((products) => {
        //console.log("observable productsService", products);
      })
    }
  }

  createProducts(products) {
    
    for (let product of products) {
      let tProduct:Product = new Product();
      tProduct.id = product.id;
      tProduct.sku = product.sku;
      tProduct.slug = product.slug;
      tProduct.name = product.name;
      tProduct.collections = product.relationships.collections.data;
      tProduct.categories = product.relationships.categories.data;
      tProduct.brands = product.relationships.brands.data;
      tProduct.price = product.price[0].amount;
      tProduct.formattedPrice = product.meta.display_price.with_tax.formatted;
      tProduct.mainImage = product.mainImage;
      tProduct.discount = product.discount;
      tProduct.rating = product.rating;
      tProduct.color = product.color;
      tProduct.colorCode = product.colorCode;
      tProduct.fit = product.fit;
      tProduct.newArrival = product.newArrival;
      tProduct.reviews = product.reviews;
      tProduct.description = product.description;
      this.products.push(tProduct);
    }
  }
}
