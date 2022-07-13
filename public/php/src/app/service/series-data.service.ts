import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../series/series.component';
import { SeriesAdd } from '../add-series/add-series.component';

@Injectable({
  providedIn: 'root'
})
export class SeriesDataService {

  constructor(private _http:HttpClient) { }

  #baseUrl="http://localhost:3000/api/series"

  public getAllSeries(offset:number,count:number):Observable<Series[]>{
    const url=this.#baseUrl+"?offset="+offset+"&count="+count;
    return this._http.get<Series[]>(url);
  }

  public getTotalCount():Observable<number>{
    const url=this.#baseUrl+"/totalcount";
    return this._http.get<number>(url);
  }

  public getSeriesById(id:string):Observable<Series>{
    const url=this.#baseUrl+"/"+id;
    return this._http.get<Series>(url);
  }

  public deleteById(id:string):Observable<String>{
    const url=this.#baseUrl+"/"+id;
    return this._http.delete<String>(url);
  }

  public getSeriesByName(name:string):Observable<Series[]>{
    console.log("name--->",name)
    const url=this.#baseUrl+"/search/"+name;
    return this._http.get<Series[]>(url);
  }

  public addNewSeries(series:SeriesAdd):Observable<Series>{

    return this._http.post<Series>(this.#baseUrl,{
      'name':series.name,
      'language':series.language,
      'genre':series.genre,
      'presentYear':series.presentYear,
      'production':{
        'name':series.production.name,
        'country':series.production.country,
        'coordinates':{
          'lat':series.production.location[0],
          'lng':series.production.location[1]
        }
      }
    });
  }

  public updateSeries(id:string,series:SeriesAdd):Observable<Series>{
    console.log("Inside frontend update");
    console.log(series);
    const url=this.#baseUrl+"/"+id;
    return this._http.put<Series>(url,{
      'name':series.name,
      'language':series.language,
      'genre':series.genre,
      'presentYear':series.presentYear
    });
  }

  public geoSearch(id:string,lat:Number,lng:Number):Observable<Series[]>{
    console.log("Inside frontend update");
    console.log("lat",lat);
    console.log("lat",lng);

    const url=this.#baseUrl+"/geosearch/"+id+"?offset=0&count=5&lat="+lat+"&lng="+lng;
    return this._http.get<Series[]>(url);
  }
}
