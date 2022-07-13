import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SeriesComponent } from './series/series.component';
import { DeleteSeriesComponent } from './delete-series/delete-series.component';
import { UpdateSeriesComponent } from './update-series/update-series.component';
import { AddSeriesComponent } from './add-series/add-series.component';
import { DeleteReviewComponent } from './delete-review/delete-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { SearchComponent } from './search/search.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HomeComponent } from './home/home.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    SeriesComponent,
    DeleteSeriesComponent,
    UpdateSeriesComponent,
    AddSeriesComponent,
    DeleteReviewComponent,
    UpdateReviewComponent,
    SearchComponent,
    SeriesDetailComponent,
    ReviewDetailComponent,
    ReviewsComponent,
    HomeComponent,
    AddReviewComponent,
    LoginComponent,
    RegisterComponent,
    UpdateComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([{
      path: "",
      component: HomeComponent
    }, {
      path: "series",
      component: SeriesComponent
    }, {
      path: "add",
      component: AddSeriesComponent
    },
    {
      path: "search",
      component: SearchComponent
    }, {
      path: "series/:id",
      component: SeriesDetailComponent
    }, {
      path: "reviews/:seriesId",
      component: ReviewsComponent
    },
    {
      path: "reviewDetail/:id",
      component: ReviewDetailComponent
    },
    {
      path: "addReview/:id",
      component: AddReviewComponent
    },{
      path:"navigate",
      component:NavigationComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
