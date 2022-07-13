import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Production, Series } from '../series/series.component';
import { SeriesDataService } from '../service/series-data.service';

export class LocationAdd {
  #lat!: Number;
  #lng!: Number;

  constructor(lat: Number, lng: Number) {
    this.#lat = lat;
    this.#lng=lng;
  }

  get lat() {
    return this.#lat;
  }
  get lng() {
    return this.#lng;
  }
}


export class ProductionAdd {
  #name!: string;
  #country!: string;
  #location!: Array<Number>;

  constructor(name: string, location: Array<Number>,country:string) {
    this.#name = name;
    this.#location = location;
    this.#country=country;
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

export class SeriesAdd {
  #name!: string;
  #language!: string;
  #genre!: string;
  #presentYear!: string;
  #production!:ProductionAdd

  constructor( name: string,
     language: string, 
     genre: string, 
     presentYear: string,production:ProductionAdd) {
    this.#name = name;
    this.#language = language;
    this.#genre = genre;
    this.#presentYear = presentYear;
    this.#production=production;
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

  get production() {
    return this.#production;
  }

}


@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: ['./add-series.component.css']
})
export class AddSeriesComponent implements OnInit {

  #addForm!:FormGroup;

  series!:SeriesAdd;

  message!:String;

  displayMessage:boolean=true;


  get addForm(){
    return this.#addForm;
  }

  constructor(private _formBuilder:FormBuilder,private _seriesService:SeriesDataService) { 
  
  }

  ngOnInit(): void {
    this.#addForm=this._formBuilder.group({
      name:"",
      genre:"",
      language:"",
      presentYear:"",
      productionName:"",
      country:"",
      lat:"",
      lng:"",

    });
  }

  addSeries():void{
    console.log(this.#addForm.value.name);
    const location:Array<Number>=[this.#addForm.value.lat,this.#addForm.value.lng];
   const production=new ProductionAdd(this.#addForm.value.name,
    location,this.#addForm.value.country);


    this.series=new SeriesAdd(this.#addForm.value.name,
      this.#addForm.value.language,
      this.#addForm.value.genre,
      this.#addForm.value.presentYear,production);

      console.log("add series");

      console.log(this.series);

      this._seriesService.addNewSeries(this.series).subscribe({
        next: (savedSeries)=>{
          
          this.message="New series added successfully!"
          this.displayMessage=true;
          this.#addForm.reset();
        }
      });
  }

}
