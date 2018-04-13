import { ProductsService } from './products.service';
import { ApiAuthService } from './api-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: ApiAuthService, private prod: ProductsService) {
  }

  ngOnInit() {

    this.auth.authenticate();

    setTimeout(() => {
      this.prod.getAllProducts();
    }, 1000);
    
    
    // console.log("ok1");
    // this.auth.getAuthToken().subscribe(result => {
    //   console.log("resylt: " + result)
    // });

    //console.log(JSON.parse(Moltin.storage.localStorage.moltinCredentials));
    
    // const products = Moltin.Products.All().then((products) => {
    //   console.log(products);

    // }, (error) => {
    //   console.log("error in calling products: " + error);
    // });

    // Moltin.Authenticate().then(response => {
    //   console.log('authenticated', response)
    // })

    // 879c7dec0c52fba48b4e9bfa349d91c56fc24896
    // 879c7dec0c52fba48b4e9bfa349d91c56fc24896

    //console.log("app: " + this.auth.isValidToken('879c7dec0c52fba48b4e9bfa349d91c56fc24896'));
  }
}
