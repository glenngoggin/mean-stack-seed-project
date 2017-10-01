import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ApiResponseHelperService } from '../../core/services/helpers/api-response.helper.service';
import { TaskService } from '../services/helpers/task.helper.service';
import { TaskStore } from '../services/store/task.store';
import { Task } from '../services/interfaces/task.interface';

@Component({
    selector: 'completed-tasks',
    styleUrls: ['../styles/task.scss'],
    templateUrl: '../views/completed-tasks.component.html',
})

export class CompletedTasksComponent implements OnInit {

    tasks$: Observable<Task[]>;

    @Output()
    onRemove: EventEmitter<any> = new EventEmitter();

    isLoading: boolean = true;

    constructor(
        private taskStore: TaskStore,
        private taskService: TaskService,
        private apiResponseHelperService: ApiResponseHelperService) { }

    ngOnInit() {
        this.tasks$ = this.taskStore.select('tasks')
            .filter(Boolean)
            .map(tasks => tasks.filter(task => task.status === 'completed'));
    }

    remove(event) {
        this.onRemove.emit(event);
    }

    drop(event: any) {

        var droppedTask = event.dragData;
        droppedTask.status = 'completed';

        this.taskService
            .updateTask(droppedTask)
            .then(response => {
                this.isLoading = false;
                this.taskService.updateTaskStore(droppedTask);
                this.apiResponseHelperService.parseApiResponseAndShowAlert(response);
            })
            .catch(errorResponse => {
                this.apiResponseHelperService.parseApiResponseAndShowAlert(errorResponse);
            });
    }
}