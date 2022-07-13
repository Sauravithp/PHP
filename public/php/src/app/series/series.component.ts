import { Component, OnInit } from '@angular/core';
import { SeriesDataService } from '../service/series-data.service';


export class Review {
  #_id!: string;
  #rating!: number;
  #description!: string;

  constructor(_id: string, rating: number, description: string) {
    this.#_id = _id;
    this.#rating = rating;
    this.#description = description;
  }

  get _id() {
    return this.#_id;
  }
  get rating() {
    return this.#rating;
  }
  get description() {
    return this.#description;
  }

}

export class Production {
  #_id!: string;
  #name!: string;
  #location!: Array<Number>;
  #country!: string;


  constructor(_id: string, name: string, location: Array<Number>, country: string) {
    this.#_id = _id;
    this.#name = name;
    this.#location = location;
    this.#country = country;
  }

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }
  get location() {
    return this.#location;
  }

  get country() {
    return this.#country;
  }
}

export class Series {
  #_id!: string;
  #name!: string;
  #language!: string;
  #genre!: string;
  #presentYear!: string;
  #review!: [Review]
  #production!: Production

  constructor(_id: string, name: string,
    language: string,
    genre: string,
    presentYear: string, review: [Review], production: Production) {
    this.#_id = _id;
    this.#name = name;
    this.#language = language;
    this.#genre = genre;
    this.#presentYear = presentYear;
    this.#review = review;
    this.#production = production
  }

  get _id() {
    return this.#_id;
  }

  get name() {
    return this.#name;
  }

  get language() {
    return this.#language;
  }

  get genre() {
    return this.#genre;
  }

  get presentYear() {
    return this.#presentYear;
  }

  get review() {
    return this.#review;
  }

  get production() {
    return this.#production;
  }

}

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  seriesList: Series[] = [];

  count = 5;
  offset = 0;
  viewedCount = 0;
  totalCount = 0;
  isPreviouseDisabled = true;
  isNextDisabled = false;

  constructor(private _service: SeriesDataService) {
  }

  ngOnInit(): void {
    this._service.getAllSeries(this.offset, this.count).subscribe({
      next: (data) => {
        this.seriesList = data;
        console.log(this.seriesList);
        this.viewedCount = this.seriesList.length;
      }
    });

    this._service.getTotalCount().subscribe({
      next: (data) => {
        this.totalCount = data;
        console.log(this.totalCount);
      }
    });

  }

  onNext(): void {
    if (this.viewedCount != this.totalCount) {
      this.offset = this.offset + 1;
      this._service.getAllSeries(this.offset, this.count).subscribe((series) => {
        this.seriesList = series;
        console.log(this.seriesList);
        this.viewedCount = this.viewedCount + this.count;
        if (this.viewedCount >= this.totalCount) {
          this.isNextDisabled = true;
          this.viewedCount = this.totalCount;
        }
        if (this.offset != 0) {
          this.isPreviouseDisabled = false;
        }
      });
    }
  }

  onPrevious(): void {
    this.offset = this.offset - 1;
    this._service.getAllSeries(this.offset, this.count).subscribe((series) => {
      this.seriesList = series;
      console.log(this.seriesList);
      this.viewedCount = this.viewedCount - this.count;
    });

    if (this.offset == 0) {
      this.isPreviouseDisabled = true;
      this.isNextDisabled = false;
    }

  }



}
