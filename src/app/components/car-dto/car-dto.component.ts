import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {
  carDtos:CarDto;
  carImages:CarImage[]=[];
  rentals:Rental[];
  currentImage : CarImage;
  dataLoaded = false;
  status:boolean
  path="https://localhost:44354/Images/";

  constructor(private carService:CarService, private carImageService:CarImageService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDtos(params["carId"])
        this.getCarImages(params["carId"])
      }
    })
  }

  getCarDtos(cardId:number){
    this.carService.getCarDtos(cardId).subscribe(response=>{
      this.carDtos=response.data[0];
      this.status=this.carDtos.status;
    })
  }

  getCarImages(carId:number){
    this.carImageService.getCarImages(carId).subscribe(response=>{
      this.carImages=response.data;
    })
  }

  getImagePath(imagePath:string){
    let newPath=this.path+imagePath;
    return newPath;
  }

  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }

  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getSliderClassName(index:number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

}
