import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../services/entity.service";
import {IEntity} from "../../interfaces/entity.interface";
import {map} from "rxjs";
import {IOptions} from 'src/app/interfaces/options.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  entities: Array<IEntity> = []
  filteredEntities: Array<IEntity> = []
  entity: IEntity = {id: 0, name: '', surname: ''}
  options: IOptions = {create: true, update: false, delete: false}
  filterValue: string = ''

  constructor(private _entityService: EntityService) {
  }

  ngOnInit(): void {
    this._entityService.getEntities()
      .pipe(
        map(arr => arr.sort((a: IEntity, b: IEntity) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        )
      ).subscribe(result => {
      this.entities = result.map(item => {
        return {
          ...item,
          selected: false
        }
      })
      this.filteredEntities = [...this.entities]
    })
  }

  clearSelected() {
    this.entity = {id: 0, name: '', surname: ''}
    this.options = this.changeUpdateDelete('disable')
    this.entities = this.entities.map(element => {
        return {
          ...element,
          selected: false
        }
      }
    )
  }

  handleSelectEntity(entity: IEntity): void {
    this.entity = entity
    this.options = this.changeUpdateDelete('enable')
    this.entities = this.entities.map(element => {
        return {
          ...element,
          selected: element.id === entity.id
        }
      }
    )
    this.filteredEntities = this.entities.filter(entity => {
      return !this.filterValue || entity.surname.toLowerCase().startsWith(this.filterValue.toLowerCase())
    })
  }

  changeUpdateDelete(type: string): IOptions {
    const operation: any = {
      enable: {
        create: true,
        update: true,
        delete: true
      },
      disable: {
        create: true,
        update: false,
        delete: false
      }
    }
    return operation[type]
  }

  handleFilterChange(filter: string) {
    this.filterValue = filter
    this.clearSelected()
    this.filteredEntities = this.entities.filter(entity => !filter || entity.surname.toLowerCase().startsWith(filter.toLowerCase()))
  }

  validateData() {
    return !!this.entity.name && !!this.entity.surname
  }

  addNewEntity(entity: IEntity) {
    this._entityService.addEntity(entity).subscribe(entities => {
      this.entities = entities
      this.filteredEntities = entities
    })
  }

  updateEntity(entity: IEntity) {
    this._entityService.updateEntity(entity).subscribe(entities => {
      this.entities = entities
      this.filteredEntities = entities
    })
  }

  deleteEntity(entity: IEntity) {
    this._entityService.deleteEntity(entity).subscribe(entities => {
      this.entities = entities
      this.filteredEntities = entities
    })
  }

  handleActions(event: string) {
    const actions: any = {
      create: this.addNewEntity,
      update: this.updateEntity,
      delete: this.deleteEntity
    }
    if (!this.validateData()) {
      alert('Invalid data, please check name and surname.')
      return
    }
    try {
      actions[event].call(this, this.entity)
      alert(`${event} successfully.`)
    }catch (e) {
      alert('Ups and error has occurred.')
    }finally {
      this.clearSelected()
    }
  }

}
