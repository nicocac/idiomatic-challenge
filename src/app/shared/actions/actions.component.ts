import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IOptions} from "../../interfaces/options.interface";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent {
  @Input() options: IOptions = {create: true, update: false, delete: false}
  @Output() action: EventEmitter<string> = new EventEmitter<string>()

  handleEvent(event: string): void {
    this.action.emit(event)
  }

}
