import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-to-post',
  templateUrl: './to-post.component.html',
  styleUrls: ['./to-post.component.scss']
})
export class ToPostComponent implements OnInit {

  @Output() toPost: EventEmitter<any> = new EventEmitter();

  postForm = new FormGroup({
    postText: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  postSend(){
    if(this.postForm.get('postText').value){
      this.toPost.emit(this.postForm.get('postText').value);
      this.postForm.controls.postText.setValue('');
    }
  }

}
