import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { ApiResponseHelperService } from '../../core/services/helpers/api-response.helper.service';
import { BookService } from '../services/helpers/book.helper.service';
import { Book } from '../services/interfaces/book.interface';

import { AuthorService } from '../services/helpers/author.helper.service';



@Component({
    selector: 'create-book',
    styleUrls: ['../styles/book.scss'],
    templateUrl: '../views/create-book.component.html',
})

export class CreateBookComponent {

    newBook = {} as Book;
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private bookService: BookService,
        private authorService: AuthorService,
        private apiResponseHelperService: ApiResponseHelperService) {

    }

    submitCreateBookForm(book: Book, isValid: boolean) {
       
        if (isValid) {
            this.isLoading = true;

            // Check if authors, if authors: create authors to get id's. If no authors, initialise blank authors array
            if (book.authors) {
                
                let authors = this.authorService.removeIdsFromAuthors(book.authors);
                
                this.authorService
                    .createAuthors(authors)
                    .then(response => {
                        var authorIds = this.authorService.getArrayOfAuthorIds(response.data);
                        this.createBook(book, authorIds);
                    })
                    .catch(errorResponse => {
                        this.apiResponseHelperService.parseApiResponseAndShowAlert(errorResponse);
                        this.isLoading = false;
                    });
            }
            else {
                book.authors = [];
                this.createBook(book,book.authors);
            }

        }
    }

    createBook(book: Book, authorIds: any) {
        let bookCopy = { ...book }
        bookCopy.authors = authorIds;
        bookCopy.price = book.price.toString();

        this.bookService
            .createBook(bookCopy)
            .then(response => {
                this.isLoading = false;
                this.apiResponseHelperService.parseApiResponseAndShowAlert(response);
                this.router.navigateByUrl('/books');
            })
            .catch(errorResponse => {
                this.apiResponseHelperService.parseApiResponseAndShowAlert(errorResponse);
                this.isLoading = false;
            });
    }
}