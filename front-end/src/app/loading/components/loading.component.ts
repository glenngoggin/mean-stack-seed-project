import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: '../views/loading.component.html',
  styleUrls: ['../styles/loading.component.scss']
})
export class LoadingComponent implements OnChanges {
  @Input() isLoading:boolean;
  
  ngOnChanges(changes) {
    if(changes.isLoading){
      this.isLoading = changes.isLoading.currentValue;
    }
  }
 
}
