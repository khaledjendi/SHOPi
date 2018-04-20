import { Price } from './../common/Price';
import { Config } from './../config';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../common/Product';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { CallOperator } from './../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './../services/session.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsService } from '../services/products.service';

declare var jQuery: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild("mainImage") mainImage: ElementRef;
  @ViewChild("thumbImageContainer") thumbImageContainer: ElementRef;

  id;
  returnPageUrl;
  returnSubPageUrl;
  brand;

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


  @BlockUI() blockAllUI: NgBlockUI;

  constructor(public sessionService: SessionService, private route: ActivatedRoute, private productService: ProductsService, private toastr: ToastrService, private router: Router) {
    this.getProducts(); // to be replaced with related products
  }

  ngOnInit() {
    this.queryParams();
    jQuery(this.mainImage.nativeElement).xzoom({ zoomWidth: 500, title: true, tint: '#333', Xoffset: 15 })
  }

  private queryParams() {
    this.route.queryParams
      .subscribe(params => {
        if (!this.sessionService.selectedProduct) {
          this.sessionService.selectedProduct = new Product();
          this.sessionService.selectedProduct.images = [];
          this.sessionService.selectedProduct.price = new Price();
          this.id = params.id;
          this.getProduct(this.id);
          // this.loadProduct({
          //   "type": "product",
          //   "id": "be5a48e7-40ee-43c9-bfe3-f0e12af65169",
          //   "name": "Cotton Cable Crew",
          //   "slug": "GCL_1000000",
          //   "sku": "GCL_1000000",
          //   "manage_stock": true,
          //   "description": "Fit: Regular\nMaterial: Outer fabric: cotton 100%\nOuter fabric: cotton 100%\nCable knit\nFine wash at max. 40˚C",
          //   "price": [
          //     {
          //       "amount": 1500,
          //       "currency": "SEK",
          //       "includes_tax": true
          //     }
          //   ],
          //   "status": "live",
          //   "commodity_type": "physical",
          //   "meta": {
          //     "timestamps": {
          //       "created_at": "2018-04-13T04:42:06+00:00",
          //       "updated_at": "2018-04-14T19:54:56+00:00"
          //     },
          //     "display_price": {
          //       "with_tax": {
          //         "amount": 1500,
          //         "currency": "SEK",
          //         "formatted": "1,500 kr"
          //       },
          //       "without_tax": {
          //         "amount": 1500,
          //         "currency": "SEK",
          //         "formatted": "1,500 kr"
          //       }
          //     },
          //     "stock": {
          //       "level": 0,
          //       "availability": "out-stock"
          //     }
          //   },
          //   "relationships": {
          //     "files": {
          //       "data": [
          //         {
          //           "type": "file",
          //           "id": "0e868183-ba1a-4ad0-9a1d-6083ebdbb811"
          //         },
          //         {
          //           "type": "file",
          //           "id": "7dc2f96b-3020-404b-a49c-8209893b5e01"
          //         }
          //       ]
          //     },
          //     "categories": {
          //       "data": [
          //         {
          //           "type": "category",
          //           "id": "c136df12-476c-4491-a4f1-5a42a6574a38"
          //         },
          //         {
          //           "type": "category",
          //           "id": "f6f964fb-4b23-47df-a0c1-208a93afdfb9"
          //         },
          //         {
          //           "type": "category",
          //           "id": "d24fbadd-0067-487c-b45e-508947304906"
          //         }
          //       ]
          //     },
          //     "collections": {
          //       "data": [
          //         {
          //           "type": "collection",
          //           "id": "cdaadc9f-4657-475b-9b6a-e21a0c5322a9"
          //         }
          //       ]
          //     },
          //     "brands": {
          //       "data": [
          //         {
          //           "type": "brand",
          //           "id": "1e0240ab-53fa-4f30-acef-b361754616d1"
          //         }
          //       ]
          //     },
          //     "main_image": {
          //       "data": {
          //         "type": "main_image",
          //         "id": "6f0f7c2c-6db0-447e-999a-8a7b0174cbcb"
          //       }
          //     }
          //   },
          //   "rating": 5,
          //   "discount": 0,
          //   "color": "Pacific Blue",
          //   "fit": "Regular",
          //   "newArrival": true,
          //   "reviews": 17,
          //   "colorCode": "blue",
          //   "mainImage": "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/6f0f7c2c-6db0-447e-999a-8a7b0174cbcb.jpg",
          //   "brand": "Gant"
          // });
          // if (this.sessionService.selectedProduct.brands && this.sessionService.selectedProduct.brands.length > 0)
          //   this.getBrand(this.sessionService.selectedProduct.brands[0].id);
        }
        this.mapSiteTree(params.returnPageUrl, params.returnSubPageUrl);
      });
  }

  mapSiteTree(returnPageUrl, returnSubPageUrl) {
    if (!returnSubPageUrl || returnSubPageUrl === "") return;
    this.returnPageUrl = returnPageUrl;
    this.returnSubPageUrl = returnSubPageUrl;
  }

  getProduct(id) {
    this.blockAllUI.start();
    let productsService = this.productService.callGet(CallOperator.Product, id);
    if (productsService instanceof Promise) {
      productsService.then(
        promise => promise.subscribe(
          products =>
            this.loadProduct(products.data),
          error => this.loadError()))
        .catch(
          error => this.loadError())
    }
    else {
      productsService.subscribe(
        products => this.loadProduct(products.data),
        error => this.loadError())
    }
  }

  loadProduct(product) {
    this.sessionService.selectedProduct = new Product();
    this.sessionService.selectedProduct.id = product.id;
    this.sessionService.selectedProduct.sku = product.sku;
    this.sessionService.selectedProduct.slug = product.slug;
    this.sessionService.selectedProduct.name = product.name;
    this.sessionService.selectedProduct.collections = product.relationships.collections.data;
    this.sessionService.selectedProduct.categories = product.relationships.categories.data;
    this.sessionService.selectedProduct.brands = product.relationships.brands.data;
    this.sessionService.selectedProduct.brand = product.brand;
    let price: Price = new Price(product.meta.display_price.with_tax.amount, product.meta.display_price.with_tax.formatted, product.meta.display_price.with_tax.currency);
    this.sessionService.selectedProduct.price = price;
    this.sessionService.selectedProduct.images.push(Config.baseImagesUrl + product.relationships.main_image.data.id + ".jpg");
    for (let auxImg of product.relationships.files.data) {
      this.sessionService.selectedProduct.images.push(Config.baseImagesUrl + auxImg.id + ".jpg");
    }
    this.sessionService.selectedProduct.discount = product.discount;
    this.sessionService.selectedProduct.rating = product.rating;
    this.sessionService.selectedProduct.color = product.color;
    this.sessionService.selectedProduct.colorCode = product.colorCode;
    this.sessionService.selectedProduct.fit = product.fit;
    this.sessionService.selectedProduct.newArrival = product.newArrival;
    this.sessionService.selectedProduct.reviews = product.reviews;
    this.sessionService.selectedProduct.description = product.description;
    //if (product.relationships.brands.data && product.relationships.brands.data.length > 0) this.getBrand(product.brands[0].id);
    if (this.blockAllUI.isActive) this.blockAllUI.stop();
    //console.log(this.sessionService.selectedProduct);
  }

  getBrand(id) {
    let productsService = this.productService.callGet(CallOperator.Brand, id);
    if (productsService instanceof Promise) {
      productsService.then(promise => promise.subscribe(brand => this.brand = brand.data))
    }
    else {
      productsService.subscribe(brand => this.brand = brand.data)
    }
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

  loadError() {
    setTimeout(() => {
      if (this.blockAllUI.isActive) this.blockAllUI.stop();
      this.router.navigate(['']);
    }, 1000);
  }

  showImage(src) {
    var containedEImgThumbs = this.thumbImageContainer.nativeElement.childNodes;
    for (let elm of containedEImgThumbs) {
      if (elm.nodeName == "DIV")
        for (let elmImg of elm.childNodes)
          if (elmImg.nodeName == "IMG") {
            if (elmImg.src != src)
              elmImg.classList.remove("img-thumb-carousel-active");
            else
              elmImg.classList.add("img-thumb-carousel-active");
          }
    }
    this.mainImage.nativeElement.src = src;
    this.mainImage.nativeElement.setAttribute('xoriginal', src);
  }

  getPrice() {
    if (this.eligibleDiscount())
      return Price.getDisountPrice(
        this.sessionService.selectedProduct.price.amount,
        this.sessionService.selectedProduct.discount,
        this.sessionService.selectedProduct.price.currencyAbbr);
    return this.sessionService.selectedProduct.price.formattedPrice;
  }

  eligibleDiscount() {
    return this.sessionService.selectedProduct.discount && this.sessionService.selectedProduct.discount > 0;
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
}
