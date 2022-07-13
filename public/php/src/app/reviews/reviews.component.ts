import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../series/series.component';
import { ReviewDataService } from '../service/review-data.service';

export class ReviewResponse {
  #_id!: string;
  #review!: [Review];

  constructor(_id: string, review: [Review], ) {
    this.#_id = _id;
    this.#review = review;
 
  }

  get _id() {
    return this.#_id;
  }
  get review() {
    return this.#review;
  }
  

}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews:Review[]=[];
  reviewResponse!:ReviewResponse;
   seriesId!:string;
   isUpdateDisbaled=true;

  constructor(private _router:Router,private _service:ReviewDataService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("inside review");
    this.seriesId=this._route.snapshot.params["seriesId"];
    this._service.getReviewsBySeriesId(this.seriesId).subscribe({
      next: data =>{
        this.reviewResponse=data;
        console.log(this.reviewResponse._id);
        console.log(JSON.stringify(this.reviewResponse.review));
        this.reviews=JSON.parse(JSON.stringify(this.reviewResponse.review));
        console.log("reviews-->"+this.reviews);
      }
    });
  }

  onAdd():void{
    this._router.navigate(["addReview/"+this.seriesId]);
  }

  onDelete(id:string):void{
   console.log(this.seriesId)
   this._service.deletetReviewsBySeriesId(this.seriesId,id).subscribe({
    next: data=>{
      console.log(data);
      this._router.navigate(["/series/"+this.seriesId]);
    }
   });

  }

  onUpdate(review:Review):void{


  }

}
