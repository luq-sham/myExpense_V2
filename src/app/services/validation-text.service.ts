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
          transaction_amount:[
            {label: 'Transaction Amount', error: 'required', message: 'Transaction amount is required.'},
          ],
          transaction_category:[
            {label: 'Transaction Category', error: 'required', message: 'Transaction category is required.'},
          ],
          transaction_account:[
            {label: 'Transaction Account', error: 'required', message: 'Transaction account is required.'},
          ],

          //new Budget
          budget_name:[
            {label: 'Budget Name', error: 'required', message: 'Budget name is required.'}
          ],
          budget_amount:[
            {label: 'Budget Amount', error: 'required', message: 'Budget amount is required.'}
          ],
          budget_category:[
            {label: 'Budget Category', error: 'required', message: 'Budget category is required.'}
          ],
          budget_account:[
            {label: 'Budget Account', error: 'required', message: 'Budget account is required.'}
          ],
          
          //new Savings
          savings_name:[
            {label: 'Savings Name', error: 'required', message: 'Savings name is required.'}
          ],
          savings_amount:[
            {label: 'Savings Amount', error: 'required', message: 'Savings amount is required.'}
          ],
        }
      }
      default: {
        return {};
      }
    }
  }
}
