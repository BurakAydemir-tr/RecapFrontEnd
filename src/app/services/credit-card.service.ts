import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl="https://localhost:44354/api/";

  constructor(private httpClient:HttpClient) { }

  CheckCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+"creditcards/creditcardexist";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}
