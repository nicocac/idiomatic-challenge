import {Component, OnInit} from '@angular/core';
import {EntityService} from "../../services/entity.service";
import {IEntity} from "../../interfaces/entity.interface";
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
      .subscribe(result => {
      this.entities = result.map(item => {
        return {
          ...item,
          selected: false
        }
      })
      this.filteredEntities = [...this.entities]
    })
  }

  addNewEntity(entity: IEntity): void {
    this._entityService.addEntity(entity).subscribe(entities => {
      this.entities = entities
      this.filteredEntities = entities
      this.clearSelected()
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

  clearSelected(): void {
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

  deleteEntity(entity: IEntity): void {
    this._entityService.deleteEntity(entity).subscribe(entities => {
      this.entities = entities
      this.filteredEntities = entities
    })
  }

  fillSelectedEntities (entity: IEntity): Array<IEntity> {
    return this.entities.map(element => {
        return {
          ...element,
          selected: element.id === entity.id
        }
      }
    )
  }

  filterEntities (filter: string): Array<IEntity> {
    return this.entities.filter(entity => {
      return !filter || entity.surname.toLowerCase().startsWith(filter.toLowerCase())
    })
  }

  handleActions(event: string): void {
    const actions: any = {
      create: this.addNewEntity,
      update: this.updateEntity,
      delete: this.deleteEntity
    }
    if (!this.entity.valid) {
      alert('Invalid data, please check name and surname.')
      return
    }
    try {
      actions[event].call(this, this.entity)
      alert(`${event} successfully.`)
    }catch (e: any) {
      alert('Ups and error has occurred: ' + e.message)
    }finally {
      this.clearSelected()
    }
  }

  handleFilterChange(filter: string): void {
    this.filterValue = filter
    this.clearSelected()
    this.filteredEntities = this.filterEntities(filter)
  }

  handleSelectEntity(entity: IEntity): void {
    this.entity = entity
    this.entity.valid = true
    this.options = this.changeUpdateDelete('enable')
    this.entities = this.fillSelectedEntities(entity)
    this.filteredEntities = this.filterEntities(this.filterValue)
  }

  updateEntity(entity: IEntity): void {
    this._entityService.updateEntity(entity).subscribe(entities => {
      this.entities = entities
      this.filteredEntities = entities
      this.clearSelected()
    })
  }

}
