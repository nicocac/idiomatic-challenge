import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEntity} from "../../interfaces/entity.interface";

@Component({
  selector: 'app-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})
export class SimpleListComponent implements OnInit {
  @Input() data: Array<IEntity> = []
  @Output() selectEntity: EventEmitter<IEntity> = new EventEmitter<IEntity>()
  constructor() { }

  ngOnInit(): void {
  }

  onSelectEntity (entity: IEntity): void {
    this.selectEntity.emit(entity)
  }

}
