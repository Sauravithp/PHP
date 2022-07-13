import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewDataService } from '../service/review-data.service';

export class AddReview {
  #rating!: number;
  #description!: string;

  constructor(rating: number, description: string) {
    this.#rating = rating;
    this.#description = description;
  }

  get rating() {
    return this.#rating;
  }
  get description() {
    return this.#description;
  }

}

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  seriesId!:string;

  @ViewChild("addReviewForm")
  addReviewForm!:NgForm;

  constructor(private _service:ReviewDataService,private _route:ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {
    this.seriesId=this._route.snapshot.params["id"];
    console.log(this.seriesId);
    console.log("init called");
    let review=new AddReview(0,"");
    setTimeout(() => {
      this.addReviewForm.setValue(review);
    }, 0);
  }
  
  addReview():void{
    console.log(this.addReviewForm.value);
    let review=new AddReview(this.addReviewForm.value.rating,this.addReviewForm.value.description);
    console.log("request body",review);
    this._service.saveReviewBySeriesId(this.seriesId,review).subscribe({
      next: data=> console.log(data)
    });
    this._router.navigate(["reviews/"+this.seriesId]);
  }

}
