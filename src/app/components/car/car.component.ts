import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  brands:Brand[]=[];
  colors:Color[]=[];
  dataLoaded=false
  carDtos:CarDto[]=[]
  filterText="";
  brandId:number;
  colorId:number;

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
    private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrands()
        this.getColors()
        this.getCars()
      if(params['brandId'] && params['colorId']){
        this.getCarsByFilter(params['brandId'],params['colorId'])
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }

    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.carDtos=response.data;
      this.dataLoaded=true;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getCarDtos(carId:number){
    this.carService.getCarDtos(carId).subscribe(response=>{
      this.carDtos=response.data;
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.carDtos=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.carDtos=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByFilter(brandId:number, colorId:number){
    this.carService.getCarsByFilter(brandId,colorId).subscribe(response=>{
      this.carDtos=response.data;
      this.dataLoaded=true;
    })

  }

  getSelectedBrand(brandId:number){
    if (this.brandId==brandId) {
      console.log(this.brandId)
      return true
    }else{
      return false
    }
  }

  getSelectedColor(colorId:number){
    if (this.colorId==colorId) {
      console.log(this.colorId)
      return true
    }else{
      return false
    }
  }

}
