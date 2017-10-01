import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    declarations:[HomeComponent],
    imports:[RouterModule.forChild(ROUTES),CommonModule],
    exports:[HomeComponent]
})

export class HomeModule {}
