import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  /* We must make the property public this time
        because we will bind to it in the template */
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
