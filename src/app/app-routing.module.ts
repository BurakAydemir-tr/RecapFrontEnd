import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/cardto/:carId",component:CarDtoComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"payment/:rental", component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
