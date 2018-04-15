import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductsService, CallOperator } from './../../services/products.service';
import { PageType } from './../common-header/common-header.component';
import { Product } from './../Product';

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

  products = []; //: Product[]


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
          // this.products = [
          //   {
          //     "id": "c0802b48-8f95-41da-b979-a3f555140784",
          //     "sku": "SAMM_18122304",
          //     "slug": "SAMM_18122304",
          //     "name": "Maasai o-n 9670",
          //     "collections": [
          //       {
          //         "type": "collection",
          //         "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //       }
          //     ],
          //     "categories": [
          //       {
          //         "type": "category",
          //         "id": "d24fbadd-0067-487c-b45e-508947304906"
          //       },
          //       {
          //         "type": "category",
          //         "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //       },
          //       {
          //         "type": "category",
          //         "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //       }
          //     ],
          //     "brands": [
          //       {
          //         "type": "brand",
          //         "id": "85d0308a-8b82-423c-b2b0-87800d9e9862"
          //       }
          //     ],
          //     "price": 990,
          //     "formattedPrice": "990 kr",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/9955ba31-1df1-4efa-ac97-89a8f80df76f.jpg",
          //     "discount": 20,
          //     "rating": 4,
          //     "color": "Dark Sapphire",
          //     "colorCode": "black",
          //     "fit": "Regular",
          //     "newArrival": false,
          //     "reviews": 7,
          //     "description": "Fit: Regular\nMaterial: 100% cotton.\nCrew neck\nRibbed knit texture pattern\nContrast trim\nFine wash at max. 30˚C"
          //   },
          //   {
          //     "id": "200ad926-9563-4242-bb51-45de3898e1cc",
          //     "sku": "SAMM_18122303",
          //     "slug": "SAMM_18122303",
          //     "name": "Maasai o-n 9670",
          //     "collections": [
          //       {
          //         "type": "collection",
          //         "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //       }
          //     ],
          //     "categories": [
          //       {
          //         "type": "category",
          //         "id": "d24fbadd-0067-487c-b45e-508947304906"
          //       },
          //       {
          //         "type": "category",
          //         "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //       },
          //       {
          //         "type": "category",
          //         "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //       }
          //     ],
          //     "brands": [
          //       {
          //         "type": "brand",
          //         "id": "85d0308a-8b82-423c-b2b0-87800d9e9862"
          //       }
          //     ],
          //     "price": 990,
          //     "formattedPrice": "990 kr",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
          //     "discount": 0,
          //     "rating": 5,
          //     "color": "Clear Cream",
          //     "colorCode": "white",
          //     "fit": "Regular",
          //     "newArrival": true,
          //     "reviews": 7,
          //     "description": "100% cotton\nCrew neck\nRibbed knit texture pattern\nContrast trim\nFine wash at max. 30˚C\nItem number: 16055535\nSKU: SAMM18122303\nID: 16055529"
          //   },
          //   {
          //     "id": "4e124dde-2dd0-471a-8bbd-c1b64e3f5457",
          //     "sku": "GCL_1000002",
          //     "slug": "GCL_1000002",
          //     "name": "Cotton Cable Crew",
          //     "collections": [
          //       {
          //         "type": "collection",
          //         "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //       }
          //     ],
          //     "categories": [
          //       {
          //         "type": "category",
          //         "id": "d24fbadd-0067-487c-b45e-508947304906"
          //       },
          //       {
          //         "type": "category",
          //         "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //       },
          //       {
          //         "type": "category",
          //         "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //       }
          //     ],
          //     "brands": [
          //       {
          //         "type": "brand",
          //         "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
          //       }
          //     ],
          //     "price": 1250,
          //     "formattedPrice": "1,250 kr",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/ef14e8ce-d86e-4dca-9cba-95ff81f748e7.jpg",
          //     "discount": 10,
          //     "rating": 5,
          //     "color": "Sand Melange",
          //     "colorCode": "brown",
          //     "fit": "Regular",
          //     "newArrival": false,
          //     "reviews": 16,
          //     "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C"
          //   },
          //   {
          //     "id": "3ddd02b6-3575-408e-a59b-1be90e12cb3d",
          //     "sku": "GCL_1000001",
          //     "slug": "GCL_1000001",
          //     "name": "Cotton Cable Crew",
          //     "collections": [
          //       {
          //         "type": "collection",
          //         "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //       }
          //     ],
          //     "categories": [
          //       {
          //         "type": "category",
          //         "id": "d24fbadd-0067-487c-b45e-508947304906"
          //       },
          //       {
          //         "type": "category",
          //         "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //       },
          //       {
          //         "type": "category",
          //         "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //       }
          //     ],
          //     "brands": [
          //       {
          //         "type": "brand",
          //         "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
          //       }
          //     ],
          //     "price": 1500,
          //     "formattedPrice": "1,500 kr",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/9ec801f4-8f0b-4006-a75d-8ae896d1e217.jpg",
          //     "discount": 0,
          //     "rating": 4,
          //     "color": "Yale Blue",
          //     "colorCode": "blue",
          //     "fit": "Regular",
          //     "newArrival": false,
          //     "reviews": 10,
          //     "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C"
          //   },
          //   {
          //     "id": "be5a48e7-40ee-43c9-bfe3-f0e12af65169",
          //     "sku": "GCL_1000000",
          //     "slug": "GCL_1000000",
          //     "name": "Cotton Cable Crew",
          //     "collections": [
          //       {
          //         "type": "collection",
          //         "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //       }
          //     ],
          //     "categories": [
          //       {
          //         "type": "category",
          //         "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //       },
          //       {
          //         "type": "category",
          //         "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //       },
          //       {
          //         "type": "category",
          //         "id": "d24fbadd-0067-487c-b45e-508947304906"
          //       }
          //     ],
          //     "brands": [
          //       {
          //         "type": "brand",
          //         "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
          //       }
          //     ],
          //     "price": 1500,
          //     "formattedPrice": "1,500 kr",
          //     "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/6f0f7c2c-6db0-447e-999a-8a7b0174cbcb.jpg",
          //     "discount": 0,
          //     "rating": 5,
          //     "color": "Pacific Blue",
          //     "colorCode": "blue",
          //     "fit": "Regular",
          //     "newArrival": true,
          //     "reviews": 17,
          //     "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C"
          //   }
          // ]
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
        this.createProducts(products.data);
      })
    }
  }

  createProducts(products) {
    for (let product of products) {
      let tProduct: Product = new Product();
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

    console.log("objects are: ", JSON.stringify(this.products));
  }

  onProductSelected(product) {
    //console.log(product);
  }
}
