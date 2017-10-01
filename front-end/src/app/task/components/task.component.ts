import { Component, OnInit, Input,Output, EventEmitter  } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { Task } from '../services/interfaces/task.interface';
import swal from 'sweetalert2';


@Component({
    selector: 'task',
    styleUrls:['../styles/task.scss'],
    templateUrl: '../views/task.component.html',
})

export class TaskComponent implements OnInit {
    @Input() task:Task;

    @Output() 
    onRemove:EventEmitter<any> = new EventEmitter();

    isLoading: boolean = false;

    constructor(private modalService: NgbModal) {}
    
    ngOnInit() {
       
    }

    openConfirmDeleteModal(){
        
        swal({
            title: 'Are you sure you want to delete this task?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00a8ff',
            cancelButtonColor: '#46c35f',
            confirmButtonText: 'Yes, delete it!'
          }).then(response => {
            this.remove();
          }),
          function(dismiss) {

          }
        
    }


    remove(){
        this.onRemove.emit(this.task);
    }
  
}