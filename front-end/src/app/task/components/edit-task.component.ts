import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { ApiResponseHelperService } from '../../core/services/helpers/api-response.helper.service';
import { TaskService } from '../services/helpers/task.helper.service';
import { Task } from '../services/interfaces/task.interface';
import { UserService } from '../services/helpers/user.helper.service';


@Component({
    selector: 'edit-task',
    styleUrls: ['../styles/task.scss'],
    templateUrl: '../views/edit-task.component.html',
})

export class EditTaskComponent {

    task = {} as Task;
    taskId: string;
    isLoading: boolean = false;
    subscription: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private taskService: TaskService,
        private userService: UserService,
        private apiResponseHelperService: ApiResponseHelperService) {
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe(params => {
            this.taskId = params['id'];

            // FIXME: Should probably use observable instead of promises here..
            this.taskService.getTask(this.taskId).then(response => {
                this.task = response.data;
            });
            this.isLoading = false;
        });

    }


    submitUpdateTaskForm(task: Task, isValid: boolean) {

        if (isValid) {
            task._id = this.task._id;
            this.isLoading = true;

            // Check if users, if users: create users to get id's. If no users, initialise blank users array
            if (task.users) {

                let users = this.userService.removeIdsFromUsers(task.users);

                this.userService
                    .createUsers(users) // FIXME: Should really have more logic here instead of just creating new users each time. 
                    .then(response => {
                        var userIds = this.userService.getArrayOfUserIds(response.data);
                        this.updateTask(task, userIds);
                    })
                    .catch(errorResponse => {
                        this.apiResponseHelperService.parseApiResponseAndShowAlert(errorResponse);
                        this.isLoading = false;
                    });
            }
            else {
                task.users = [];
                this.updateTask(task, task.users);
            }

        }
    }

    updateTask(task: Task, userIds: any) {
        let taskCopy = { ...task }
        taskCopy.users = userIds;

        this.taskService
            .updateTask(taskCopy)
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}