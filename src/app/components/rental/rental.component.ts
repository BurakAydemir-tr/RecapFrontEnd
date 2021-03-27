import { Component, Input, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/carDto';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[]=[];
  dataLoaded=false;

  @Input() carforrental:CarDto
  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    // this.getRentals();
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }

}
