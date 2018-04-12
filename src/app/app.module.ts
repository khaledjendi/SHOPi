import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatToolbarModule, MatButtonModule, MatButtonToggleModule, MatTabsModule, MatCardModule, MatTooltipModule, MatSelectModule, MatRadioModule, MatExpansionModule, MatDividerModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonHeaderComponent } from './common/common-header/common-header.component';
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
    CategoriesLabelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'clothes-collection/:type', component: ClothesCollectionComponent},
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
