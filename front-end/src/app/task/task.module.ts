
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { LaddaModule } from 'angular2-ladda';
import { TagInputModule } from 'ngx-chips';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DndModule } from 'ng2-dnd';

import { CoreModule } from '../core/core.module';
import { LoadingModule } from '../loading/loading.module';

import { UserService } from './services/helpers/user.helper.service';
import { TaskService } from './services/helpers/task.helper.service';
import { TaskStore } from './services/store/task.store';

import { TaskListComponent } from './components/task-list.component';
import { TaskComponent } from './components/task.component';
import { InQueueTasksComponent } from './components/in-queue-tasks.component';
import { InProgressTasksComponent } from './components/in-progress-tasks.component';
import { CompletedTasksComponent } from './components/completed-tasks.component';
import { CreateTaskComponent } from './components/create-task.component';
import { EditTaskComponent } from './components/edit-task.component';

export const ROUTES: Routes = [
    {
        path: 'tasks',
        component: TaskListComponent,
        pathMatch: 'full'
    },
    {
        path: 'tasks/create',
        component: CreateTaskComponent,
        pathMatch: 'full'
    },
    {
        path: 'tasks/:id',
        component: EditTaskComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [TaskListComponent, TaskComponent, InQueueTasksComponent, InProgressTasksComponent, CompletedTasksComponent, CreateTaskComponent,EditTaskComponent],
    imports: [RouterModule.forChild(ROUTES),CommonModule,FormsModule,NgbModule,NgxPaginationModule, LaddaModule,TagInputModule,Ng2SearchPipeModule, BrowserAnimationsModule, DndModule.forRoot(), CoreModule,LoadingModule, HttpModule],
    providers:[UserService,TaskService,TaskStore],
    entryComponents: [],
    exports: [TaskListComponent, InQueueTasksComponent, InProgressTasksComponent, CompletedTasksComponent, CreateTaskComponent,EditTaskComponent]
})

export class TaskModule { }
