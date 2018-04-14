import { PageType } from './../common-header/common-header.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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


  products = [
    {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }, {
      src: "https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/ee5732a5-0d9a-484f-b2ad-ee6b9ba92850/a93a4194-f879-4259-b9d7-dc9f354786bb.jpg",
      discount: null,
      news: null,
      title: "Maasai o-n 9670",
      collection: "Men",
      price: "550 kr"
    }
  ]

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let type = params.get('type');
      this.type = (type) ? PageType[type.charAt(0).toUpperCase() + type.substr(1).toLowerCase()] : null;
      switch (this.type) {
        case PageType.Men:
          this.collectionHeader = "url('../../assets/img/collection/men/banner_1.jpg')";
          break;
      }
    })
  }

  getType() {
    return PageType[this.type].toString();
  }

}
