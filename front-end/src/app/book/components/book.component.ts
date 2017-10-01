import { Component, OnInit, Input,Output, EventEmitter  } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { Book } from '../services/interfaces/book.interface';
import swal from 'sweetalert2';


@Component({
    selector: '[book]',
    styleUrls:['../styles/book.scss'],
    templateUrl: '../views/book.component.html',
})

export class BookComponent implements OnInit {
    @Input() book:Book;

    @Output() 
    onRemove:EventEmitter<any> = new EventEmitter();

    isLoading: boolean = false;

    constructor(private modalService: NgbModal) {}
    
    ngOnInit() {
       
    }

    openConfirmDeleteModal(){
        
        swal({
            title: 'Are you sure you want to delete this book?',
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
        this.onRemove.emit(this.book);
    }
  
}