import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductionAdd, SeriesAdd } from '../add-series/add-series.component';
import { Series } from '../series/series.component';
import { SeriesDataService } from '../service/series-data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  @Input()
  updateSeries!:Series;

  upadtedValue!:SeriesAdd;

  #updateForm!:FormGroup;

  get updateForm(){
    return this.#updateForm;
  }

  isUpdateEnabled=false;

  constructor(private _formBuilder:FormBuilder,private _seriesService:SeriesDataService,private _router:Router) {
   }

  ngOnInit(): void {
    this.#updateForm=this._formBuilder.group({
      name:this.updateSeries.name,
      language:this.updateSeries.language,
      genre:this.updateSeries.genre,
      presentYear:this.updateSeries.presentYear
    });
  }

  onUpdate():void{
    console.log(this.updateSeries);
    this.isUpdateEnabled=true;
  }

  onSave():void{
    console.log(this.updateSeries);
    const location:[Number,Number]=[45,63];
    const production=new ProductionAdd(this.updateSeries.production.name,location,this.updateSeries.production.country);
    this.isUpdateEnabled=true;
    this.upadtedValue=new SeriesAdd(this.#updateForm.value.name,this.#updateForm.value.language,
      this.#updateForm.value.genre,this.#updateForm.value.presentYear,production);
      console.log("updated Value",this.upadtedValue)
    this._seriesService.updateSeries(this.updateSeries._id,this.upadtedValue).subscribe({
      next: updatedSeries=>{ 
          this._router.navigate(["/series"]);
      }
    });

  }

  onCancel():void{
    this.isUpdateEnabled=false;
  }

}
