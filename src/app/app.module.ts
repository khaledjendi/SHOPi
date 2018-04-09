import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatToolbarModule, MatButtonModule, MatButtonToggleModule, MatTabsModule, MatCardModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeComponent } from './home/home.component';
import { ManHomeCategoryComponent } from './home/man-home-category/man-home-category.component';
import { HomeDefaultComponent } from './home/home-default/home-default.component';
import { WomanHomeCategoryComponent } from './home/woman-home-category/woman-home-category.component';
import { KidsHomeCategoryComponent } from './kids-home-category/kids-home-category.component';
import { HotDealsHomeCategoryComponent } from './hot-deals-home-category/hot-deals-home-category.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeHeaderComponent,
    HomeComponent,
    ManHomeCategoryComponent,
    HomeDefaultComponent,
    WomanHomeCategoryComponent,
    KidsHomeCategoryComponent,
    HotDealsHomeCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
