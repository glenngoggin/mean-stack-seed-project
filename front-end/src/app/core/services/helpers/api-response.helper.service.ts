import { Injectable } from '@angular/core';
import swal from 'sweetalert2'

@Injectable()
export class ApiResponseHelperService{

    constructor(){}


    parseApiResponseAndShowAlert(response){

        console.log(response);
        switch(response.code){
            case 200:
                this.showOkAlert(response);
                break;
            case 201:
                this.showCreatedAlert(response);
                break;
            case 400:
                this.showValidationAlert(response);
                break;
            case 500:
                this.showErrorAlert(response);
                break;  
        }
    }
      
    showOkAlert(response){
        swal('Huzzah...', response.message, 'info')
    }

    showCreatedAlert(response){
        swal('Success :-)', response.message, 'success')
    }

    showValidationAlert(response){
        swal(response.message, this.parseForErrorMessages(response), 'warning')
    }

    showErrorAlert(response){
        swal(response.message, this.parseForErrorMessages(response), 'error')
    }

    parseForErrorMessages(response){

        let validationMessage:string='';

        for (var i = 0; i < response.errors.length; i++) {
            for (var m = 0; m < response.errors[i].messages.length; m++) {
                var message = response.errors[i].messages[m];
                message = message.replace(/\\/g, '');
                validationMessage+= message + '\n ';
            }
        }

        return validationMessage;
    }
    
}