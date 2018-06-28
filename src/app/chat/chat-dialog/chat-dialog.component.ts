import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {

    // this.chat.talk();

    // appends to array after each new message is added to the feed source
    this.messages = this.chat.conversation.asObservable()
    .scan((acc, val) => acc.concat(val));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    // event handler to bind it to html
    this.formValue = '';
  }

}
