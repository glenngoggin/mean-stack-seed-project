import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { ApiResponseHelperService } from '../../core/services/helpers/api-response.helper.service';
import { TaskService } from '../services/helpers/task.helper.service';
import { Task } from '../services/interfaces/task.interface';

import { UserService } from '../services/helpers/user.helper.service';


@Component({
    selector: 'create-task',
    styleUrls: ['../styles/task.scss'],
    templateUrl: '../views/create-task.component.html',
})

export class CreateTaskComponent {

    newTask = {} as Task;
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private taskService: TaskService,
        private userService: UserService,
        private apiResponseHelperService: ApiResponseHelperService) {
        this.newTask.status = "in_queue";
    }

    submitCreateTaskForm(task: Task, isValid: boolean) {
       
        console.log(task);
        if (isValid) {
            this.isLoading = true;

            // Check if users, if users: create users to get id's. If no users, initialise blank users array
            if (task.users) {
                
                let users = this.userService.removeIdsFromUsers(task.users);

                console.log(users);
                
                this.userService
                    .createUsers(users)
                    .then(response => {
                        var userIds = this.userService.getArrayOfUserIds(response.data);
                        this.createTask(task, userIds);
                    })
                    .catch(errorResponse => {
                        this.apiResponseHelperService.parseApiResponseAndShowAlert(errorResponse);
                        this.isLoading = false;
                    });
            }
            else {
                task.users = [];
                this.createTask(task,task.users);
            }

        }
    }

    createTask(task: Task, userIds: any) {
        let taskCopy = { ...task }
        taskCopy.users = userIds;
        this.taskService
            .createTask(taskCopy)
            .then(response => {
                this.isLoading = false;
                this.apiResponseHelperService.parseApiResponseAndShowAlert(response);
                this.router.navigateByUrl('/tasks');
            })
            .catch(errorResponse => {
                this.apiResponseHelperService.parseApiResponseAndShowAlert(errorResponse);
                this.isLoading = false;
            });
    }
}