import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


import { Task } from '../services/interfaces/task.interface';
import { User } from '../services/interfaces/user.interface';
import { TaskService } from '../services/helpers/task.helper.service';
import { TaskStore } from '../services/store/task.store';

@Component({
    selector: 'task-list',
    styleUrls: ['../styles/task.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: '../views/task-list.component.html',
})

export class TaskListComponent implements OnInit, OnDestroy {
    pageSize: number = 5;
    page: number = 1;
    searchTerm: string;
    tasks$: Observable<Task[]>;
    subscription: Subscription;
    isLoading: boolean = true;

    constructor(private taskStore: TaskStore, private taskService: TaskService) {

    }

    ngOnInit() {
        this.tasks$ = this.taskStore.select<Task[]>('tasks');
        this.subscription = this.taskService.getTasks$.subscribe();
        this.isLoading = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    remove(task: Task) {
        this.taskService.deleteTask(task._id);
    }

}