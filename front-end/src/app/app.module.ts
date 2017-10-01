// NG Core Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// App Plugin Modules
import { LaddaModule } from 'angular2-ladda';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// App Core Modules
import { ErrorModule } from './error/error.module';
import { LoadingModule } from './loading/loading.module';
import { CoreModule } from './core/core.module';

// App Feature Modules
import { NavModule } from './nav/nav.module';
import { HomeModule } from './home/home.module';
import { BookModule } from './book/book.module';
import { TaskModule } from './task/task.module';

// App Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './error/components/not-found.component';
import { LoadingComponent } from './loading/components/loading.component';

import { NavComponent } from './nav/components/nav.component';
import { HomeComponent } from './home/components/home.component';
import { BookListComponent } from './book/components/book-list.component';


export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(ROUTES),
    LaddaModule,
    NgbModule.forRoot(),
    CoreModule,
    ErrorModule,
    LoadingModule,
    NavModule,
    HomeModule,
    BookModule,
    TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent,NavComponent]
})
export class AppModule { }
