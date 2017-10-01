import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthorService{

    constructor(
        private http:Http
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
    
    createAuthors(authors:any): Promise<any>{
        return this.http
            .post(`${environment.apiUrl}/authors/bulk`, authors, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json())
            .catch(error=> Promise.reject(error.json()));
    }

    removeIdsFromAuthors(authors){
        for (var i = 0; i < authors.length; i++) {
            delete(authors[i]._id);
        }
        return authors;
    }

    getArrayOfAuthorIds(authors){

        var ids = [];

        for (var i = 0; i < authors.length; i++) {
            ids.push(authors[i]._id);
        }

        return ids;
        
    }
   
}