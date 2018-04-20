import { Config } from './../../config';
import { Price } from './../../common/Price';
import { ToastrService } from 'ngx-toastr';
import { ProductsService, CallOperator } from './../../services/products.service';
import { Product } from './../../common/Product';
import { expandCollapse } from '../home-category.animations';
import { Component, OnInit, Injectable, Output, EventEmitter, AfterViewInit } from '@angular/core';

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

  menCarousel = {
    slidesShow: 4,
    products: [{
      src: '../assets/img/carousel/jacket_1.jpg',
      discount: '25%',
      news: null,
      name: 'Gant New Collection',
      gender: 'Men',
      price: '530 kr'
    }, {
      src: '../assets/img/carousel/blazer_1.jpg',
      discount: null,
      news: {
        backgroundColor: 'g-bg-primary',
        description: 'New Arrival'
      },
      name: 'Gianni Feraud Suit',
      gender: 'Men',
      price: '1 550 kr'
    }, {
      src: '../assets/img/carousel/nike_1.jpg',
      discount: null,
      news: null,
      name: 'Nike Air',
      gender: 'Men',
      price: '1 250 kr'
    }, {
      src: '../assets/img/carousel/jeans_1.jpg',
      discount: '50%',
      news: {
        backgroundColor: 'g-bg-lightred',
        description: 'Sold Out'
      },
      name: 'Tiger of Sweden Jeans',
      gender: 'Men',
      price: '950 kr'
    }, {
      src: '../assets/img/carousel/fila_1.jpg',
      discount: null,
      news: null,
      name: 'Filla Sweaters',
      gender: 'Men',
      price: '720 kr'
    }, {
      src: '../assets/img/carousel/sweater_1.jpg',
      discount: null,
      news: null,
      name: 'Avslappnad Sweaters',
      gender: 'Men',
      price: '520 kr'
    }]
  };

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

  constructor(private productService: ProductsService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getProducts(); // This method will be replaced to load only new arrival or best selling items...
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
