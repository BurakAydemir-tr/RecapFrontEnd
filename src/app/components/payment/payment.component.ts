import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CreditCard } from 'src/app/models/creditCard';
import { CustomerDto } from 'src/app/models/customerDto';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  rental:Rental
  car:CarDto
  carName:string;
  customer:CustomerDto;
  cardName:string;
  colorName:string;
  modelYear:number;
  dailyprice:number;
  cardNumber: string;
  securityCode: string;
  expirationDate: string;
  customerID:number;
  cardControl:boolean;
  creditCard:CreditCard

  //@Input() rentForPayment:Rental;
  //@Input() carForRental:RentalDto;
  constructor(private rentalService:RentalService,private creditCardService:CreditCardService,
    private toastrService:ToastrService,private carService:CarService,private customerService:CustomerService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCarDto(this.rental.carId)
        this.getCustomerDto(this.rental.customerId)
        this.RentCar()
      }
    });
  }

  getCarDto(carId:number){
    this.carService.getCarDtos(carId).subscribe(response=>{
      this.car=response.data[0];
      this.carName=this.car.carName;
      this.colorName=this.car.colorName;
      this.modelYear=this.car.modelYear;
      this.dailyprice=this.car.dailyPrice;
    })
  }

  getCustomerDto(customerId:number){
    this.customerService.getCustomerDto(customerId).subscribe(response=>{
      this.customer=response.data[0];
    })
  }

  CheckCardName():boolean{
    let str:string[]
    str=this.cardName.toUpperCase().split(" ")
    if (str.includes(this.customer.firstName.toUpperCase()) &&
    str.includes(this.customer.lastName.toUpperCase())){
      this.customerID=this.customer.customerId
      return true;
    }else{
      this.toastrService.error("Card ismini yanl???? girdiniz veya b??yle bir card mevcut de??il","Card Hatas??")
      return false;
    }
  }

  RentCar(){ 
    if (this.CheckCardName()) {
      this.creditCard={
        customerId:this.customerID,
        creditCardNumber:this.cardNumber,
        expirationDate:this.expirationDate,
        securityCode:this.securityCode
      }  
    }

    this.creditCardService.CheckCreditCard(this.creditCard).subscribe(response=>{
      
      if(response.success){
        this.rentalService.addRental(this.rental).subscribe(response=>{
          console.log(response.success)
          this.toastrService.success("??demeniz ger??ekle??ti","Ba??ar??l??")
          this.toastrService.success("Kiralam i??lemi ger??ekle??ti","Ba??ar??l??")
        })
      }else{
        this.toastrService.error("Kart bilgileri hatal??","Hata")
      }
    });
    
    
  }


}
