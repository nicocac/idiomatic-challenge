import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEntity} from "../../interfaces/entity.interface";

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})
export class SimpleListComponent {
  @Input() data: Array<IEntity> = []
  @Output() selectEntity: EventEmitter<IEntity> = new EventEmitter<IEntity>()

  onSelectEntity (entity: IEntity): void {
    this.selectEntity.emit(entity)
  }

}
