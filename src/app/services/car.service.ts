import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44354/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getallcardetails";
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarDtos(carId:number):Observable<ListResponseModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getcardetails?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getcarsbybrandid?id="+brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDto>>{
    let newPath=this.apiUrl+"cars/getcarsbycolorid?id="+colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<CarDto>>{
    let newPath = this.apiUrl + "cars/getcarsdetailbyfilter?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

}
