import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDto } from '../models/customerDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl="https://localhost:44354/api/";

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetailDto():Observable<ListResponseModel<CustomerDto>>{
    let newPath=this.apiUrl+"customers/getcustomerdetails"
    return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }

  getCustomerDto(customerId:number):Observable<ListResponseModel<CustomerDto>>{
    let newPath=this.apiUrl+"customers/getcustomerdetailbyid?id=" + customerId;
    return this.httpClient.get<ListResponseModel<CustomerDto>>(newPath);
  }
}
