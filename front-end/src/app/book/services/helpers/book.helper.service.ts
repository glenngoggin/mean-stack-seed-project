import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { BookStore } from '../store/book.store';
import { Book } from '../interfaces/book.interface';
import { ApiResponseHelperService } from '../../../core/services/helpers/api-response.helper.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookService{

    constructor(
        private http:Http,
        private bookStore:BookStore,
        private apiResponseHelperService: ApiResponseHelperService
    ){}
        
   
    getOptions(){
        let headers = new Headers({
            'Content-Type':'application/json'
        });

        let options = new RequestOptions({
           headers:headers 
        });

        return options;
    }
    

    getBooks$: Observable<Book[]> = this.http
        .get(`${environment.apiUrl}/books`, this.getOptions())
        .map(response => response.json())
        .do(response => this.bookStore.set('books',response.data));

    getBook(bookId:string): Promise<any>{
        return this.http
            .get(`${environment.apiUrl}/books/${bookId}`, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json());
    }

    createBook(book:Book): Promise<any>{
        return this.http
            .post(`${environment.apiUrl}/books`, book, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json())
            .catch(error=> Promise.reject(error.json()));
    }

    updateBook(book:Book): Promise<any>{
        return this.http
            .put(`${environment.apiUrl}/books/${book._id}`, book, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json())
            .catch(error=> Promise.reject(error.json()));
    }

    deleteBook(bookId: String) {
        this.http
          .delete(`${environment.apiUrl}/books/${bookId}`, this.getOptions())
          .map(response => response.json())
          .subscribe((response: any) => {
            
            if(response.code === 200){
                const value = this.bookStore.value.books;
                const books = value.filter((book: Book) => book._id != bookId);
                this.bookStore.set('books', books);
            }  
           
            this.apiResponseHelperService.parseApiResponseAndShowAlert(response);
            
          })
      }
}