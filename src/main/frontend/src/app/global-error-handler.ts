import { ErrorHandler, Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private flash : FlashMessagesService) { }

    handleError(error) {
        this.flash.show(error.error.message, { cssClass: 'alert-danger', timeout: 10000 });
        console.log(error);
    }

}