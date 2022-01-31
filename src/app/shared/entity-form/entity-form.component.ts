import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEntity} from "../../interfaces/entity.interface";

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  @Input() entity: IEntity = {id: 0 ,name: '', surname: ''}
  @Output() entityChange: EventEmitter<IEntity> = new EventEmitter<IEntity>()
  constructor() { }

  ngOnInit(): void {
  }

  handleInput () {
    this.entityChange.emit(this.entity)
  }

}
