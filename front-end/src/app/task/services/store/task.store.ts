import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

import { TaskState } from '../interfaces/task.state.interface';


const taskstate: TaskState = {
    tasks: undefined
};

export class TaskStore {

    private subject = new BehaviorSubject<TaskState>(taskstate);
    private store = this.subject.asObservable().distinctUntilChanged();

    get value() {
        return this.subject.value;
    }

    select<T>(name: string): Observable<T> {
        return this.store.pluck(name);
    }

    set(name: string, taskstate: any) {
        this.subject.next({ ...this.value, [name]: taskstate });
    }
}