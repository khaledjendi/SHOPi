import { Config } from './../config';
import { ToastrService } from 'ngx-toastr';
import { Product } from './../common/Product';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { CallOperator } from './../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './../services/session.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

declare var jQuery: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id;
  returnPageUrl;
  returnSubPageUrl;

  imgs = ["assets/img-temp/250x170/img1.jpg",
    "assets/img-temp/250x170/img2.jpg",
    "assets/img-temp/250x170/img3.jpg",
    "assets/img-temp/250x170/img1.jpg",
    "assets/img-temp/250x170/img2.jpg",
    "assets/img-temp/250x170/img3.jpg"];

    imgs1 = ["assets/img-temp/700x1145/img1.jpg", "assets/img-temp/700x1145/img2.jpg", "assets/img-temp/700x1145/img3.jpg"];

  @BlockUI() blockAllUI: NgBlockUI;

  constructor(private sessionService: SessionService, private route: ActivatedRoute, private productService: ProductsService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.queryParams();
  }

  private queryParams() {
    this.route.queryParams
      .subscribe(params => {
        if (!this.sessionService.selectedProduct) {
          this.id = params.id;
          this.getAllProducts(this.id);
        }
        else {
          setTimeout(() => {
            jQuery.HSCore.components.HSCarousel.init('.js-carousel');
          });
        }
        this.mapSiteTree(params.returnPageUrl, params.returnSubPageUrl);
      });
  }

  mapSiteTree(returnPageUrl, returnSubPageUrl) {
    if (!returnSubPageUrl || returnSubPageUrl === "") return;
    this.returnPageUrl = returnPageUrl;
    this.returnSubPageUrl = returnSubPageUrl;
  }

  getAllProducts(id) {
    this.blockAllUI.start();
    let productsService = this.productService.callGet(CallOperator.Product, id);
    if (productsService instanceof Promise) {
      productsService.then(
        promise => promise.subscribe(
          products => {
            this.loadProduct(products.data);
          },
          error => { // catch observer error (in getting products)
            this.loadError();
          }))
        .catch(
          error => { // // catch promise error (in getting api token)
            this.loadError();
          }
        )
    }
    else {
      productsService.subscribe(
        (products) => {
          this.loadProduct(products.data);
        },
        error => { // catch observer error (in getting products)
          this.loadError();
        })
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
    this.sessionService.selectedProduct.price = product.price[0].amount;
    this.sessionService.selectedProduct.formattedPrice = product.meta.display_price.with_tax.formatted;
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
    setTimeout(() => {
      jQuery.HSCore.components.HSCarousel.init('.js-carousel');
    });
    if (this.blockAllUI.isActive) this.blockAllUI.stop();
    //console.log(this.sessionService.selectedProduct);
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


}
