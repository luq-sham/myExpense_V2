import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationTextService {

  constructor() { }

  FormValidation(type:any){
    let validations: any

    switch(type){
      case 'newForm':{
        return validations={
          //New Account
          accountName:[
            {label: 'Account Name', error: 'required', message: 'Account name is required.'},
          ],
          type:[
            {label: 'Account Type', error: 'required', message: 'Account type is required.'},
          ],
          balance:[
            {label: 'Balance', error: 'required', message: 'Balance is required.'},
          ],

          //New Transaction
          amount:[
            {label: 'Transaction Amount', error: 'required', message: 'Transaction amount is required.'},
          ]
        }
      }
      default: {
        return {};
      }
    }
  }
}
