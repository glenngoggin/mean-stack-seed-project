import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

import { BookState } from '../interfaces/book.state.interface';


const bookstate: BookState = {
    books: undefined
};

export class BookStore {

    private subject = new BehaviorSubject<BookState>(bookstate);
    private store = this.subject.asObservable().distinctUntilChanged();

    get value() {
        return this.subject.value;
    }

    select<T>(name: string): Observable<T> {
        return this.store.pluck(name);
    }

    set(name: string, bookstate: any) {
        this.subject.next({ ...this.value, [name]: bookstate });
    }
}