import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { ApiResponseHelperService } from '../../core/services/helpers/api-response.helper.service';
import { BookService } from '../services/helpers/book.helper.service';
import { Book } from '../services/interfaces/book.interface';

import { AuthorService } from '../services/helpers/author.helper.service';

@Component({
    selector: 'edit-book',
    styleUrls: ['../styles/book.scss'],
    templateUrl: '../views/edit-book.component.html',
})

export class EditBookComponent {

    book = {} as Book;
    bookId: string;
    isLoading: boolean = true;
    subscription: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private bookService: BookService,
        private authorService: AuthorService,
        private apiResponseHelperService: ApiResponseHelperService) {
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe(params => {
            this.bookId = params['id'];
          
            // FIXME: Should probably use observable instead of promises here..
            this.bookService.getBook(this.bookId).then(response => {
                this.book = response.data;
            });
            this.isLoading = false;
        });

    }


    submitUpdateBookForm(book: Book, isValid: boolean) {

        if (isValid) {
            book._id = this.book._id;
            this.isLoading = true;

            // Check if authors, if authors: create authors to get id's. If no authors, initialise blank authors array
            if (book.authors) {

                let authors = this.authorService.removeIdsFromAuthors(book.authors);

                this.authorService
                    .createAuthors(authors) // FIXME: Should really have more logic here instead of just creating new authors each time. 
                    .then(response => {
                        var authorIds = this.authorService.getArrayOfAuthorIds(response.data);
                        this.updateBook(book, authorIds);
                    })
                    .catch(errorResponse => {
                        this.apiResponseHelperService.parseApiResponseAndShowAlert(errorResponse);
                        this.isLoading = false;
                    });
            }
            else {
                book.authors = [];
                this.updateBook(book, book.authors);
            }

        }
    }

    updateBook(book: Book, authorIds: any) {
        let bookCopy = { ...book }
        bookCopy.authors = authorIds;
        bookCopy.price = book.price.toString();

        this.bookService
            .updateBook(bookCopy)
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}