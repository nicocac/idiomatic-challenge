import {Injectable} from '@angular/core';
import {IEntity} from "../interfaces/entity.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private _entities: Array<IEntity> = [
    {
      id: 1,
      name: 'Polar',
      surname: 'Bear'
    },
    {
      id: 2,
      name: 'Black',
      surname: 'Bear'
    },
    {
      id: 3,
      name: 'Brown',
      surname: 'Bear'
    },
    {
      id: 4,
      name: 'Grizzly',
      surname: 'Bear'
    }
  ]

  constructor() {
  }

  private _addNextId(entity: IEntity): IEntity {
    entity.id = this._entities.sort((a, b) => b.id - a.id)[0].id + 1
    return entity
  }

  private _checkIfExists(entity: IEntity) {
    return !!this._entities.find(element => element.name === entity.name && element.surname === entity.surname)
  }

  private _getPersistedEntities(): Array<IEntity> {
    return JSON.parse(sessionStorage.getItem('entities') || '[]')
  }

  private _orderEntities() {
    // deep clone from an array
    return JSON.parse(JSON.stringify(this._entities.sort((a: IEntity, b: IEntity) => a.name > b.name ? -1 : a.name < b.name ? 1 : 0)))
  }

  private _persistEntities(): void {
    sessionStorage.setItem('entities', JSON.stringify(this._entities))
  }

  getEntities(): Observable<Array<IEntity>> {
    return new Observable((observer) => {
      const persisted = this._getPersistedEntities()
      this._entities = persisted.length ? persisted : this._entities
      observer.next(this._orderEntities())
    })
  }

  addEntity(entity: IEntity): Observable<Array<IEntity>> {
    if (this._checkIfExists(entity)) throw new Error('The entity already exists.')
    const newEntity = this._addNextId(entity)
    return new Observable((observer) => {
      this._entities.push(newEntity)
      this._persistEntities()
      observer.next(this._orderEntities())
    })
  }

  updateEntity(entity: IEntity): Observable<Array<IEntity>> {
    if (this._checkIfExists(entity)) throw new Error('The entity already exists.')
    return new Observable((observer) => {
      const entitiesCopy = this._entities
        .filter(element => element.id !== entity.id)
      entitiesCopy.push(entity)
      this._entities = entitiesCopy
      this._persistEntities()
      observer.next(this._orderEntities())
    })
  }

  deleteEntity(entity: IEntity): Observable<Array<IEntity>> {
    return new Observable((observer) => {
      this._entities = this._entities.filter(element => element.id !== entity.id)
      this._persistEntities()
      observer.next(this._orderEntities())
    })
  }
}
