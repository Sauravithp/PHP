import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddReview } from '../add-review/add-review.component';
import { ReviewResponse } from '../reviews/reviews.component';
import { Review } from '../series/series.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewDataService {

  constructor(private _http:HttpClient) { }

  #baseUrl="http://localhost:3000/api/series"

  public getReviewsBySeriesId(id:string):Observable<ReviewResponse>{
    const url=this.#baseUrl+"/"+id+"/reviews";
    return this._http.get<ReviewResponse>(url);
  }

  public updateReviewsBySeriesId(seriesId:string,reviewId:string,review:AddReview):Observable<ReviewResponse>{
    const url=this.#baseUrl+"/"+seriesId+"/reviews/"+reviewId;
    return this._http.put<ReviewResponse>(url,{
      "rating":review.rating,
      "description":review.description
  });
  }


  public deletetReviewsBySeriesId(seriesId:string,reviewId:string):Observable<ReviewResponse>{
    const url=this.#baseUrl+"/"+seriesId+"/reviews/"+reviewId;
    return this._http.delete<ReviewResponse>(url);
  }

  public saveReviewBySeriesId(id:string,review:AddReview):Observable<Review>{
    console.log("save review serivce",review.description,review.rating);
    console.log("inside post review review",review);
    const url=this.#baseUrl+"/"+id+"/reviews";
    console.log(url);
    
    return this._http.post<Review>(url,{
      'rating':review.rating,
      'description':review.description
    });
  }
}
