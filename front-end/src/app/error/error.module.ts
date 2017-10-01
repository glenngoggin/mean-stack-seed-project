import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './components/not-found.component';

export const ROUTES: Routes = [
    {
        path: 'error/404',
        component: NotFoundComponent
    }
];

@NgModule({
    declarations:[NotFoundComponent],
    imports:[CommonModule,RouterModule.forChild(ROUTES),RouterModule],
    exports:[NotFoundComponent]
})

export class ErrorModule {}
