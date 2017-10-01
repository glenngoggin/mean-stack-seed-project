import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{

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
    
    createUsers(users:any): Promise<any>{
        return this.http
            .post(`${environment.apiUrl}/users/bulk`, users, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json())
            .catch(error=> Promise.reject(error.json()));
    }

    removeIdsFromUsers(users){
        for (var i = 0; i < users.length; i++) {
            delete(users[i]._id);
        }
        return users;
    }

    getArrayOfUserIds(users){

        var ids = [];

        for (var i = 0; i < users.length; i++) {
            ids.push(users[i]._id);
        }

        return ids;
        
    }
   
}