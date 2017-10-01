
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPaginationModule } from 'ngx-pagination';
import { LaddaModule } from 'angular2-ladda';
import { TagInputModule } from 'ngx-chips';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TimeAgoPipe } from 'time-ago-pipe';

import { CoreModule } from '../core/core.module';

import { AuthorService } from './services/helpers/author.helper.service';
import { BookService } from './services/helpers/book.helper.service';
import { BookStore } from './services/store/book.store';


import { BookListComponent } from './components/book-list.component';
import { BookComponent } from './components/book.component';
import { CreateBookComponent } from './components/create-book.component';
import { EditBookComponent } from './components/edit-book.component';
import { LoadingModule } from '../loading/loading.module';

export const ROUTES: Routes = [
    {
        path: 'books',
        component: BookListComponent,
        pathMatch: 'full'
    },
    {
        path: 'books/create',
        component: CreateBookComponent,
        pathMatch: 'full'
    },
    {
        path: 'books/:id',
        component: EditBookComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [BookListComponent, BookComponent, CreateBookComponent,EditBookComponent,TimeAgoPipe],
    imports: [RouterModule.forChild(ROUTES),CommonModule,FormsModule,NgxPaginationModule, LaddaModule,TagInputModule,Ng2SearchPipeModule, BrowserAnimationsModule, CoreModule,LoadingModule, HttpModule],
    providers:[AuthorService,BookService,BookStore],
    entryComponents: [],
    exports: [BookListComponent, BookComponent, CreateBookComponent,EditBookComponent]
})

export class BookModule { }
