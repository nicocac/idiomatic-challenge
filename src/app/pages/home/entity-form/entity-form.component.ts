import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEntity} from "../../../interfaces/entity.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  @Input() entity: IEntity = {id: 0 ,name: '', surname: ''}
  @Output() entityChange: EventEmitter<IEntity> = new EventEmitter<IEntity>()
  contactForm = new FormGroup({
    name: new FormControl('',  [Validators.required]),
    surname: new FormControl('',  [Validators.required])
  })
  constructor() { }

  ngOnInit(): void {
  }

  handleInput (): void {
    this.entity.valid = this.contactForm.valid
    this.entityChange.emit(this.entity)
  }

}
