import { ProductsDataService } from './services/products-data.service';
import { LoginAuthService } from './services/login-auth.service';
import { SessionService } from './services/session.service';
import { CartService } from './services/cart.service';
import { ProductsService } from './services/products.service';
import { ApiAuthService } from './services/api-auth.service';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatToolbarModule, MatButtonModule, MatButtonToggleModule, MatTabsModule, MatCardModule, MatTooltipModule, MatSelectModule, MatRadioModule, MatExpansionModule, MatDividerModule, MatSliderModule, MatTableModule, MatIconModule, MatProgressBarModule, MatDialogModule, MatPaginatorModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { RouterModule, Routes } from '@angular/router'

import {DndModule} from 'ng2-dnd';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHeaderComponent } from './common/headers/common-header/common-header.component';
import { HomeComponent } from './home/home.component';
import { ManHomeCategoryComponent } from './home/man-home-category/man-home-category.component';
import { HomeDefaultComponent } from './home/home-default/home-default.component';
import { WomanHomeCategoryComponent } from './home/woman-home-category/woman-home-category.component';
import { HotDealsHomeCategoryComponent } from './home/hot-deals-home-category/hot-deals-home-category.component';
import { KidsHomeCategoryComponent } from './home/kids-home-category/kids-home-category.component';
import { RevSliderComponent } from './home/rev-slider/rev-slider.component';
import { ProductCarouselComponent } from './common/product-carousel/product-carousel.component';
import { ClothesCollectionComponent } from './common/clothes-collection/clothes-collection.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { CommonFooterComponent } from './common/common-footer/common-footer.component';
import { PriceSliderComponent } from './common/price-slider/price-slider.component';
import { CategoriesLabelsComponent } from './common/categories-labels/categories-labels.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonProductComponent } from './common/common-product/common-product.component';
import { ToastrModule } from 'ngx-toastr';
import { CustomToastComponent } from './custom-toast/custom-toast.component';
import { BlockUIModule } from 'ng-block-ui';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { Route } from '@angular/compiler/src/core';
import { CommonMiniHeaderComponent } from './common/headers/common-mini-header/common-mini-header.component';
import { SummaryPipe } from './custom-pipes/summary.pipe';
import { ReviewsComponent } from './common/reviews/reviews.component';
import { FloatCartComponent } from './common/headers/float-cart/float-cart.component';
import { FavViewComponent } from './common/fav-view/fav-view.component';
import { ClickOutsideModule } from 'ng4-click-outside';
import { LoginComponent } from './login-auth/login/login.component';
import { SignupComponent } from './login-auth/signup/signup.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FileSizePipe } from './custom-pipes/file-size.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { UserPageComponent } from './user-pages/user-page.component';
import { NouisliderModule } from 'ng2-nouislider';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutDialogComponent } from './checkout/dialog/checkout-dialog.component';
import { OrderCompletedComponent } from './checkout/order-completed/order-completed.component';
import { UserOverviewComponent } from './user-pages/user-overview/user-overview.component';
import { UserOrdersComponent } from './user-pages/user-orders/user-orders.component';
import { UserPaymentOptionsComponent } from './user-pages/user-payment-options/user-payment-options.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clothes-collection/:type', component: ClothesCollectionComponent},
  { path: 'product-details', component: ProductDetailsComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserPageComponent, canActivate: [LoginAuthService] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [LoginAuthService] },
  { path: 'order-completed', component: OrderCompletedComponent, canActivate: [LoginAuthService] },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CommonHeaderComponent,
    HomeComponent,
    ManHomeCategoryComponent,
    HomeDefaultComponent,
    WomanHomeCategoryComponent,
    KidsHomeCategoryComponent,
    HotDealsHomeCategoryComponent,
    RevSliderComponent,
    ProductCarouselComponent,
    ClothesCollectionComponent,
    NotFoundComponent,
    CommonFooterComponent,
    PriceSliderComponent,
    CategoriesLabelsComponent,
    CommonProductComponent,
    CustomToastComponent,
    ProductDetailsComponent,
    CommonMiniHeaderComponent,
    SummaryPipe,
    ReviewsComponent,
    FloatCartComponent,
    FavViewComponent,
    LoginComponent,
    SignupComponent,
    DropZoneDirective,
    FileSizePipe,
    UserPageComponent,
    CheckoutComponent,
    CheckoutDialogComponent,
    OrderCompletedComponent,
    UserOverviewComponent,
    UserOrdersComponent,
    UserPaymentOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastComponent: CustomToastComponent
    }),
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
    MatDividerModule,
    MatSliderModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    DndModule.forRoot(),
    BlockUIModule.forRoot(),
    ClickOutsideModule,
    NouisliderModule
  ],
  providers: [ApiAuthService, 
    ProductsService, 
    ProductsDataService,
    CartService, 
    SessionService,
    LoginAuthService
  ],
  entryComponents: [CustomToastComponent, CheckoutDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
