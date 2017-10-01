
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ApiResponseHelperService} from './services/helpers/api-response.helper.service'

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers:[ApiResponseHelperService],
    entryComponents: [],
    exports: []
})

export class CoreModule { }
