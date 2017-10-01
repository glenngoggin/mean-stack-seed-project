import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Book } from '../services/interfaces/book.interface';
import { Author } from '../services/interfaces/author.interface';
import { BookService } from '../services/helpers/book.helper.service';
import { BookStore } from '../services/store/book.store';

@Component({
    selector: 'book-list',
    styleUrls:['../styles/book.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../views/book-list.component.html',
})

export class BookListComponent implements OnInit, OnDestroy {
    pageSize:number = 5;
    page: number = 1;
    searchTerm: string;
    books$: Observable<Book[]>;
    subscription: Subscription;
    isLoading: boolean = true;

    constructor(private bookStore:BookStore, private bookService:BookService){
        
    }
    
    ngOnInit() {
       this.books$ = this.bookStore.select<Book[]>('books');
       this.subscription = this.bookService.getBooks$.subscribe(); 
       this.isLoading = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
     }

     remove(book:Book){
         this.bookService.deleteBook(book._id);
     }


}