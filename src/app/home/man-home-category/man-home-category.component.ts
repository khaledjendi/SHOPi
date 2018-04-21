import { Config } from './../../config';
import { Price } from './../../common/Price';
import { ToastrService } from 'ngx-toastr';
import { ProductsService, CallOperator } from './../../services/products.service';
import { Product } from './../../common/Product';
import { expandCollapse } from '../home-category.animations';
import { Component, OnInit, Injectable, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase'

declare var jQuery: any;

@Component({
  selector: 'app-man-home-category',
  templateUrl: './man-home-category.component.html',
  styleUrls: ['./man-home-category.component.scss'],
  animations: [expandCollapse]
})

export class ManHomeCategoryComponent implements OnInit, AfterViewInit {
  private menuParts = {
    newArrival: {
      isInHeader: false,
      isInContent: false
    },
    clothing: {
      isInHeader: false,
      isInContent: false
    },
    shoes: {
      isInHeader: false,
      isInContent: false
    },
    sport: {
      isInHeader: false,
      isInContent: false
    },
    accessoriesAndBags: {
      isInHeader: false,
      isInContent: false
    }
  }
  hideOverlay: boolean = true;
  type: string = "";
  menSlides = [{
    thumb: '../../assets/img/slider/men/custom-suits.jpg',
    productName: 'Premium George & King Suits',
    posStars: new Array(4),
    negStars: new Array(1),
    reviews: 27,
    description: `It's all in the details! With George & King you can customise almost every aspect of your tailored suit. The combinations are limitless. Everything from buttons, linings and fabrics, to lapel and venting styles, you name it, you can change it!`,
    price: '4 500 kr'
  }, {
    thumb: '../../assets/img/slider/men/shoes_1.jpg',
    productName: 'Elevator Shoes',
    posStars: new Array(4),
    negStars: new Array(1),
    reviews: 7,
    description: `Brazil Quality Leather Dress Shoes Oxford Retro Men Formal Shoes`,
    price: '2 250 kr'
  }, {
    thumb: '../../assets/img/slider/men/jacket_1.jpg',
    productName: 'Tiger of Sweden',
    posStars: new Array(5),
    negStars: new Array(0),
    reviews: 7,
    description: `Men's bomber jacket in shearling. Features zip fastening and two front pockets with flaps and press button fastening. Elastic trim at cuffs and bottom hem. Regular fit. Hip length.`,
    price: '7 950 kr'
  }]

  overlayHeight = '';
  carousel = {
    slidesShow: 4,
    products: (function () {
      let products: Product[] = [];
      return products;
    })()
  }

  errorMessage = {
    text: "",
    class: ""
  };

  constructor(private productService: ProductsService, private toastr: ToastrService, private db: AngularFireDatabase) {
  }

  ngOnInit() {
    //this.getProducts(); // This method will be replaced to load only new arrival or best selling items...
    this.loadProducts([
      {
        "type": "product",
        "id": "c0802b48-8f95-41da-b979-a3f555140784",
        "name": "Maasai o-n 9670",
        "slug": "SAMM_18122304",
        "sku": "SAMM_18122304",
        "manage_stock": true,
        "description": "Fit: Regular\nMaterial: 100% cotton.\nCrew neck\nRibbed knit texture pattern\nContrast trim\nFine wash at max. 30˚C",
        "price": [
          {
            "amount": 990,
            "currency": "SEK",
            "includes_tax": true
          }
        ],
        "status": "live",
        "commodity_type": "physical",
        "meta": {
          "timestamps": {
            "created_at": "2018-04-14T10:58:02+00:00",
            "updated_at": "2018-04-14T18:03:24+00:00"
          },
          "display_price": {
            "with_tax": {
              "amount": 990,
              "currency": "SEK",
              "formatted": "990 kr"
            },
            "without_tax": {
              "amount": 990,
              "currency": "SEK",
              "formatted": "990 kr"
            }
          },
          "stock": {
            "level": 5,
            "availability": "in-stock"
          }
        },
        "relationships": {
          "files": {
            "data": [
              {
                "type": "file",
                "id": "47327a7b-3c3b-4ba6-b164-3a28159f2017"
              }
            ]
          },
          "categories": {
            "data": [
              {
                "type": "category",
                "id": "d24fbadd-0067-487c-b45e-508947304906"
              },
              {
                "type": "category",
                "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
              },
              {
                "type": "category",
                "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
              }
            ]
          },
          "collections": {
            "data": [
              {
                "type": "collection",
                "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
              }
            ]
          },
          "brands": {
            "data": [
              {
                "type": "brand",
                "id": "85d0308a-8b82-423c-b2b0-87800d9e9862"
              }
            ]
          },
          "main_image": {
            "data": {
              "type": "main_image",
              "id": "9955ba31-1df1-4efa-ac97-89a8f80df76f"
            }
          }
        },
        "rating": 4,
        "discount": 20,
        "color": "Dark Sapphire",
        "fit": "Regular",
        "newArrival": false,
        "reviews": 7,
        "colorCode": "black",
        "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/9955ba31-1df1-4efa-ac97-89a8f80df76f.jpg",
        "brand": "SAMSØE & SAMSØE"
      },
      {
        "type": "product",
        "id": "200ad926-9563-4242-bb51-45de3898e1cc",
        "name": "Maasai o-n 9670",
        "slug": "SAMM_18122303",
        "sku": "SAMM_18122303",
        "manage_stock": true,
        "description": "100% cotton\nCrew neck\nRibbed knit texture pattern\nContrast trim\nFine wash at max. 30˚C\nItem number: 16055535\nSKU: SAMM18122303\nID: 16055529",
        "price": [
          {
            "amount": 990,
            "currency": "SEK",
            "includes_tax": true
          }
        ],
        "status": "live",
        "commodity_type": "physical",
        "meta": {
          "timestamps": {
            "created_at": "2018-04-14T10:51:34+00:00",
            "updated_at": "2018-04-14T19:16:37+00:00"
          },
          "display_price": {
            "with_tax": {
              "amount": 990,
              "currency": "SEK",
              "formatted": "990 kr"
            },
            "without_tax": {
              "amount": 990,
              "currency": "SEK",
              "formatted": "990 kr"
            }
          },
          "stock": {
            "level": 10,
            "availability": "in-stock"
          }
        },
        "relationships": {
          "files": {
            "data": [
              {
                "type": "file",
                "id": "9333e56e-a8cb-46ee-b2f1-aeeba6233466"
              }
            ]
          },
          "categories": {
            "data": [
              {
                "type": "category",
                "id": "d24fbadd-0067-487c-b45e-508947304906"
              },
              {
                "type": "category",
                "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
              },
              {
                "type": "category",
                "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
              }
            ]
          },
          "collections": {
            "data": [
              {
                "type": "collection",
                "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
              }
            ]
          },
          "brands": {
            "data": [
              {
                "type": "brand",
                "id": "85d0308a-8b82-423c-b2b0-87800d9e9862"
              }
            ]
          },
          "main_image": {
            "data": {
              "type": "main_image",
              "id": "a93a4194-f879-4259-b9d7-dc9f354786bb"
            }
          }
        },
        "rating": 5,
        "discount": 0,
        "color": "Clear Cream",
        "fit": "Regular",
        "newArrival": true,
        "reviews": 7,
        "colorCode": "white",
        "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
        "brand": "SAMSØE & SAMSØE"
      },
      {
        "type": "product",
        "id": "4e124dde-2dd0-471a-8bbd-c1b64e3f5457",
        "name": "Cotton Cable Crew",
        "slug": "GCL_1000002",
        "sku": "GCL_1000002",
        "manage_stock": true,
        "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C",
        "price": [
          {
            "amount": 1250,
            "currency": "SEK",
            "includes_tax": true
          }
        ],
        "status": "live",
        "commodity_type": "physical",
        "meta": {
          "timestamps": {
            "created_at": "2018-04-14T10:42:29+00:00",
            "updated_at": "2018-04-14T19:54:43+00:00"
          },
          "display_price": {
            "with_tax": {
              "amount": 1250,
              "currency": "SEK",
              "formatted": "1,250 kr"
            },
            "without_tax": {
              "amount": 1250,
              "currency": "SEK",
              "formatted": "1,250 kr"
            }
          },
          "stock": {
            "level": 15,
            "availability": "in-stock"
          }
        },
        "relationships": {
          "files": {
            "data": [
              {
                "type": "file",
                "id": "5b6c5890-7e2b-40d6-bca1-7a0675b28024"
              },
              {
                "type": "file",
                "id": "2a9f4c21-f53d-416f-a1b2-0d4694ec13aa"
              }
            ]
          },
          "categories": {
            "data": [
              {
                "type": "category",
                "id": "d24fbadd-0067-487c-b45e-508947304906"
              },
              {
                "type": "category",
                "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
              },
              {
                "type": "category",
                "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
              }
            ]
          },
          "collections": {
            "data": [
              {
                "type": "collection",
                "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
              }
            ]
          },
          "brands": {
            "data": [
              {
                "type": "brand",
                "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
              }
            ]
          },
          "main_image": {
            "data": {
              "type": "main_image",
              "id": "ef14e8ce-d86e-4dca-9cba-95ff81f748e7"
            }
          }
        },
        "rating": 5,
        "discount": 10,
        "color": "Sand Melange",
        "fit": "Regular",
        "newArrival": false,
        "reviews": 16,
        "colorCode": "brown",
        "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/ef14e8ce-d86e-4dca-9cba-95ff81f748e7.jpg",
        "brand": "Gant"
      },
      {
        "type": "product",
        "id": "3ddd02b6-3575-408e-a59b-1be90e12cb3d",
        "name": "Cotton Cable Crew",
        "slug": "GCL_1000001",
        "sku": "GCL_1000001",
        "manage_stock": true,
        "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C",
        "price": [
          {
            "amount": 1500,
            "currency": "SEK",
            "includes_tax": true
          }
        ],
        "status": "live",
        "commodity_type": "physical",
        "meta": {
          "timestamps": {
            "created_at": "2018-04-14T10:38:14+00:00",
            "updated_at": "2018-04-14T19:54:50+00:00"
          },
          "display_price": {
            "with_tax": {
              "amount": 1500,
              "currency": "SEK",
              "formatted": "1,500 kr"
            },
            "without_tax": {
              "amount": 1500,
              "currency": "SEK",
              "formatted": "1,500 kr"
            }
          },
          "stock": {
            "level": 25,
            "availability": "in-stock"
          }
        },
        "relationships": {
          "files": {
            "data": [
              {
                "type": "file",
                "id": "157c84df-c237-40db-8328-8af591e496b5"
              },
              {
                "type": "file",
                "id": "9668e5f5-4a12-4448-99e0-e195b59ad233"
              }
            ]
          },
          "categories": {
            "data": [
              {
                "type": "category",
                "id": "d24fbadd-0067-487c-b45e-508947304906"
              },
              {
                "type": "category",
                "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
              },
              {
                "type": "category",
                "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
              }
            ]
          },
          "collections": {
            "data": [
              {
                "type": "collection",
                "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
              }
            ]
          },
          "brands": {
            "data": [
              {
                "type": "brand",
                "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
              }
            ]
          },
          "main_image": {
            "data": {
              "type": "main_image",
              "id": "9ec801f4-8f0b-4006-a75d-8ae896d1e217"
            }
          }
        },
        "rating": 4,
        "discount": 0,
        "color": "Yale Blue",
        "fit": "Regular",
        "newArrival": false,
        "reviews": 10,
        "colorCode": "blue",
        "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/9ec801f4-8f0b-4006-a75d-8ae896d1e217.jpg",
        "brand": "Gant"
      },
      {
        "type": "product",
        "id": "be5a48e7-40ee-43c9-bfe3-f0e12af65169",
        "name": "Cotton Cable Crew",
        "slug": "GCL_1000000",
        "sku": "GCL_1000000",
        "manage_stock": true,
        "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C",
        "price": [
          {
            "amount": 1500,
            "currency": "SEK",
            "includes_tax": true
          }
        ],
        "status": "live",
        "commodity_type": "physical",
        "meta": {
          "timestamps": {
            "created_at": "2018-04-13T04:42:06+00:00",
            "updated_at": "2018-04-14T19:54:56+00:00"
          },
          "display_price": {
            "with_tax": {
              "amount": 1500,
              "currency": "SEK",
              "formatted": "1,500 kr"
            },
            "without_tax": {
              "amount": 1500,
              "currency": "SEK",
              "formatted": "1,500 kr"
            }
          },
          "stock": {
            "level": 0,
            "availability": "out-stock"
          }
        },
        "relationships": {
          "files": {
            "data": [
              {
                "type": "file",
                "id": "0e868183-ba1a-4ad0-9a1d-6083ebdbb811"
              },
              {
                "type": "file",
                "id": "7dc2f96b-3020-404b-a49c-8209893b5e01"
              }
            ]
          },
          "categories": {
            "data": [
              {
                "type": "category",
                "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
              },
              {
                "type": "category",
                "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
              },
              {
                "type": "category",
                "id": "d24fbadd-0067-487c-b45e-508947304906"
              }
            ]
          },
          "collections": {
            "data": [
              {
                "type": "collection",
                "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
              }
            ]
          },
          "brands": {
            "data": [
              {
                "type": "brand",
                "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
              }
            ]
          },
          "main_image": {
            "data": {
              "type": "main_image",
              "id": "6f0f7c2c-6db0-447e-999a-8a7b0174cbcb"
            }
          }
        },
        "rating": 5,
        "discount": 0,
        "color": "Pacific Blue",
        "fit": "Regular",
        "newArrival": true,
        "reviews": 17,
        "colorCode": "blue",
        "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/6f0f7c2c-6db0-447e-999a-8a7b0174cbcb.jpg",
        "brand": "Gant"
      }
    ]);

    //console.log("this.findImgUrl()", this.findImgUrl());

  }

  ngAfterViewInit() {
    setTimeout(() => { // we use settimeout to avoid error: ExpressionChangedAfterItHasBeenCheckedError
      this.overlayHeight = (jQuery("#content-home-category").outerHeight() + 588) + "px";
    }, 0);
  }

  enterHeader(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInHeader = true;
        break;
      case "clothing":
        this.menuParts.clothing.isInHeader = true;
        break;
      case "shoes":
        this.menuParts.shoes.isInHeader = true;
        break;
      case "sport":
        this.menuParts.sport.isInHeader = true;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInHeader = true;
        break;
    }
  }

  enterContent(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInContent = true;
        break;
      case "clothing":
        this.menuParts.clothing.isInContent = true;
        break;
      case "shoes":
        this.menuParts.shoes.isInContent = true;
        break;
      case "sport":
        this.menuParts.sport.isInContent = true;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInContent = true;
        break;
    }
  }

  leaveHeader(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInHeader = false;
        break;
      case "clothing":
        this.menuParts.clothing.isInHeader = false;
        break;
      case "shoes":
        this.menuParts.shoes.isInHeader = false;
        break;
      case "sport":
        this.menuParts.sport.isInHeader = false;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInHeader = false;
        break;
    }
  }

  leaveContent(type) {
    switch (type) {
      case "newArrival":
        this.menuParts.newArrival.isInContent = false;
        break;
      case "clothing":
        this.menuParts.clothing.isInContent = false;
        break;
      case "shoes":
        this.menuParts.shoes.isInContent = false;
        break;
      case "sport":
        this.menuParts.sport.isInContent = false;
        break;
      case "accessoriesAndBags":
        this.menuParts.accessoriesAndBags.isInContent = false;
        break;
    }
  }

  validateAnimationState(type) {
    switch (type) {
      case "newArrival":
        if (this.menuParts.newArrival.isInHeader || this.menuParts.newArrival.isInContent)
          return this.expandCollapse(false, "newArrival");
        if (!this.menuParts.newArrival.isInHeader && !this.menuParts.newArrival.isInContent)
          return this.expandCollapse(true, "newArrival");
        break;
      case "clothing":
        if (this.menuParts.clothing.isInHeader || this.menuParts.clothing.isInContent)
          return this.expandCollapse(false, "clothing");
        if (!this.menuParts.clothing.isInHeader && !this.menuParts.clothing.isInContent)
          return this.expandCollapse(true, "clothing");
        break;
      case "shoes":
        if (this.menuParts.shoes.isInHeader || this.menuParts.shoes.isInContent)
          return this.expandCollapse(false, "shoes");
        if (!this.menuParts.shoes.isInHeader && !this.menuParts.shoes.isInContent)
          return this.expandCollapse(true, "shoes");
        break;
      case "sport":
        if (this.menuParts.sport.isInHeader || this.menuParts.sport.isInContent)
          return this.expandCollapse(false, "sport");
        if (!this.menuParts.sport.isInHeader && !this.menuParts.sport.isInContent)
          return this.expandCollapse(true, "sport");
        break;
      case "accessoriesAndBags":
        if (this.menuParts.accessoriesAndBags.isInHeader || this.menuParts.accessoriesAndBags.isInContent)
          return this.expandCollapse(false, "accessoriesAndBags"); // expand
        if (!this.menuParts.accessoriesAndBags.isInHeader && !this.menuParts.accessoriesAndBags.isInContent)
          return this.expandCollapse(true, "accessoriesAndBags"); // colapse
        break;
    }
  }

  expandCollapse(bool, type?) {
    if (!bool) {
      if (this.type !== type) {
        this.type = type;
        this.onMenuItemChanged(bool)
      }
    }
    else {
      if (this.type === type) {
        this.onMenuItemChanged(bool)
      }
    }
    return !bool ? 'expanded' : 'collapsed'
  }

  onMenuItemChanged(hideOverlay) {
    setTimeout(() => {
      this.hideOverlay = hideOverlay;
      this.type = "";
    }, 250);

  }

  getProducts() {
    this.errorMessage.text = "";
    let productsService = this.productService.callGet(CallOperator.AllProducts);
    if (productsService instanceof Promise) {
      productsService.then(
        promise => promise.subscribe(
          products => {
            this.loadProducts(products.data);
          },
          error => { // catch observer error (in getting products)
            this.loadProductsError();
          }))
        .catch(
          error => { // // catch promise error (in getting api token)
            this.loadProductsError();
          }
        )
    }
    else {
      productsService.subscribe(
        (products) => {
          this.loadProducts(products.data);
        },
        error => { // catch observer error (in getting products)
          this.loadProductsError();
        })
    }
  }

  loadProductsError() {
    //this.products = [];
    this.errorMessage.text = "Unexpected error while loading. Admin is notified.";
  }

  loadProducts(products) {
    if (!products || products.length === 0) {
      this.toast('No products found! Try different search options', 'Warning', 'warning', 5000);
      //this.products = [];
      this.errorMessage.text = "No products found! Try different search options";
      return;
    }

    for (let product of products) {
      let tProduct: Product = new Product();
      tProduct.id = product.id;
      tProduct.sku = product.sku;
      tProduct.slug = product.slug;
      tProduct.name = product.name;
      tProduct.collections = product.relationships.collections.data;
      tProduct.categories = product.relationships.categories.data;
      tProduct.brands = product.relationships.brands.data;
      tProduct.brand = product.brand;
      let price: Price = new Price(product.meta.display_price.with_tax.amount, product.meta.display_price.with_tax.formatted, product.meta.display_price.with_tax.currency);
      tProduct.price = price;
      tProduct.images.push(Config.baseImagesUrl + product.relationships.main_image.data.id + ".jpg");
      for (let img of product.relationships.files.data) {
        tProduct.images.push(Config.baseImagesUrl + img.id + ".jpg");
      }
      this.getFirebaseImgUrl(product.relationships.main_image.data.id).then(url => tProduct.mainImagePng = url)
      tProduct.discount = product.discount;
      tProduct.rating = product.rating;
      tProduct.color = product.color;
      tProduct.colorCode = product.colorCode;
      tProduct.fit = product.fit;
      tProduct.newArrival = product.newArrival;
      tProduct.reviews = product.reviews;
      tProduct.description = product.description;
      this.carousel.products.push(tProduct);
    }
    this.errorMessage.text = ""
  }

  getFirebaseImgUrl(imgId) {
    //get image from firebase
    let storageRef = firebase.storage().ref();
    let starsRef = storageRef.child('product_images/' + imgId + '.png');
    return starsRef.getDownloadURL();
  }

  private toast(message, header, type, timeOut) {
    switch (type) {
      case "error":
        this.toastr.error(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "warning":
        this.toastr.warning(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "info":
        this.toastr.info(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
      case "success":
        this.toastr.success(message, header, {
          timeOut: timeOut,
          easing: 'easeOutBounce',
          progressBar: true
        });
        break;
    }
  }
}
