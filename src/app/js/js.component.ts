import { Component } from '@angular/core';

@Component({
  selector: 'app-js',
  templateUrl: './js.component.html',
  styleUrls: ['./js.component.scss']
})
export class JSComponent {
  selectedTopic: string = 'object';
  selectedSubTopic: string = '';

  selectTopic(topic: string) {
    this.selectedTopic = topic;
    this.selectedSubTopic = '';
  }
  
  selectSubTopic(subTopic: string) {
    this.selectedSubTopic = subTopic;
  }
  
}
