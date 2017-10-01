import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations:[NavComponent],
    imports:[CommonModule,RouterModule,NgbModule],
    exports:[NavComponent]
})

export class NavModule {}
