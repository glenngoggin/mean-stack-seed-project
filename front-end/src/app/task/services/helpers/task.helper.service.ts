import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { TaskStore } from '../store/task.store';
import { Task } from '../interfaces/task.interface';
import { ApiResponseHelperService } from '../../../core/services/helpers/api-response.helper.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService{

    constructor(
        private http:Http,
        private taskStore:TaskStore,
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
    

    getTasks$: Observable<Task[]> = this.http
        .get(`${environment.apiUrl}/tasks`, this.getOptions())
        .map(response => response.json())
        .do(response => this.taskStore.set('tasks',response.data));

    getTask(taskId:string): Promise<any>{
        return this.http
            .get(`${environment.apiUrl}/tasks/${taskId}`, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json());
    }

    createTask(task:Task): Promise<any>{
        return this.http
            .post(`${environment.apiUrl}/tasks`, task, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json())
            .catch(error=> Promise.reject(error.json()));
    }

    updateTask(task:Task): Promise<any>{
        return this.http
            .put(`${environment.apiUrl}/tasks/${task._id}`, task, this.getOptions())
            .toPromise()
            .then((response:Response) => response.json())
            .catch(error=> Promise.reject(error.json()));
    }

    deleteTask(taskId: String) {
        this.http
          .delete(`${environment.apiUrl}/tasks/${taskId}`, this.getOptions())
          .map(response => response.json())
          .subscribe((response: any) => {
            
            if(response.code === 200){
                const value = this.taskStore.value.tasks;
                const tasks = value.filter((task: Task) => task._id != taskId);
                this.taskStore.set('tasks', tasks);
            }  
           
            this.apiResponseHelperService.parseApiResponseAndShowAlert(response);
            
          })
      }

      updateTaskStore(updateTask:Task){
        const value = this.taskStore.value.tasks;
        const tasks = value.map((task: Task) => {
            if(updateTask._id === task._id){
                return { ...task, ...updateTask };
            }
            else{
                return task;
            }
        });
        this.taskStore.set('tasks', tasks);
      }
}