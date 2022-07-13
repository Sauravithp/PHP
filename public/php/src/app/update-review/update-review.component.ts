import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddReview } from '../add-review/add-review.component';
import { Review } from '../series/series.component';
import { ReviewDataService } from '../service/review-data.service';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {

  isFormEnabled:boolean=false;

  @Input()
  updateReview!:Review;

  @Input()
  seriesId!:string;

  #updateReviewForm!:FormGroup;

  get updateReviewForm(){
    return this.#updateReviewForm;
  }

  constructor(private _formBuilder:FormBuilder,private _reviewService:ReviewDataService,private _router:Router) { }

  ngOnInit(): void {
    console.log("service id in update review",this.seriesId);
    this.#updateReviewForm=this._formBuilder.group({
      "rating":this.updateReview.rating,
      "description":this.updateReview.description
    });
    
  }

  onUpdate():void{
    this.isFormEnabled=true;

  }

  onCancel():void{
    this.isFormEnabled=false;
  }

  onUpdateReview():void{

    console.log(this.#updateReviewForm.value);
    let review=new AddReview(this.updateReviewForm.value.rating,this.updateReviewForm.value.description);
    console.log("request body",review);
    this._reviewService.updateReviewsBySeriesId(this.seriesId,this.updateReview._id,review).subscribe({
      next: data=> {
        console.log(data);
        this.#updateReviewForm.reset();
        this.isFormEnabled=false;
        this._router.navigate(["series"]);
      }
    });
  }

}
