import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CustomerDto } from 'src/app/models/customerDto';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals: Rental[] = [];
  rentalDtos: RentalDto[];
  customers: CustomerDto[];
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  rental: Rental;
  isRented: boolean = false;
  dataLoaded = false;

  @Input() carforrental: CarDto
  constructor(private rentalService: RentalService, private customerService: CustomerService,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getRentals();
    this.getCustomers();
  }

  getRentals() {
    this.rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.dataLoaded = true;
    })
  }

  getRentalDtos() {
    this.rentalService.getRentalDtos().subscribe(response => {
      this.rentalDtos = response.data
    })
  }

  getCustomers() {
    this.customerService.getCustomerDetailDto().subscribe(response => {
      this.customers = response.data
    })
  }

  createRental() {
    let rent: Rental = {
      carId: this.carforrental.id,
      customerId: this.customerId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      price: this.carforrental.dailyPrice
    }
    rent.customerId = Number(rent.customerId)

    this.isRented = true;
    this.router.navigate(['/payment/', JSON.stringify(rent)]);
    this.toastrService.success("Kiralama isteğiniz alındı. Ödeme sayfasına yönlendiriliyorsunuz.", "Kiralama isteği")
  }

}
