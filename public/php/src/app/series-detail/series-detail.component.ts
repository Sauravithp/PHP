import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Series } from '../series/series.component';
import { SeriesDataService } from '../service/series-data.service';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrls: ['./series-detail.component.css']
})
export class SeriesDetailComponent implements OnInit {

  series!: Series;

  message: String = '';
  isNearByEnabled = false;
  errorMessageEnabled=false;
  nearBySeriesProduction:Series[]=[];

  constructor(private _service: SeriesDataService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {

    const id = this._route.snapshot.params["id"];
    this._service.getSeriesById(id).subscribe({
      next: data => { 
        console.log(data);
        this.series = data;
       }
    });

  }

  onDelete(id: string): void {

    this._service.deleteById(id).subscribe({
      next: deleteResponse => { this.message = deleteResponse; }
    });

    this._router.navigate(["/series"]);
  }

  onNearBy(series: Series): void {
    console.log("inside on near by");
    console.log("series--->",series);
    const location = series.production.location;
    console.log(location);
    const result = Object.entries(location);
    const lat=result[0][1];
    const lng=result[1][1];
    this._service.geoSearch(series._id,lat,lng).subscribe({
      next:(seriesList)=>{
        if(seriesList.length>0){
          this.nearBySeriesProduction=seriesList;
          this.isNearByEnabled = true;
        }else{
          console.log("No production company found");
          this.errorMessageEnabled=true;
          this.message="No near by production company found"
        }
      }
    });
  }
}
