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

  private _addNextId (entity: IEntity): IEntity {
    entity.id = this._entities.sort((a, b) => b.id - a.id)[0].id + 1
    return entity
  }

  private _persistEntities (): void {
    sessionStorage.setItem('entities', JSON.stringify(this._entities))
  }

  private _getPersistedEntities (): Array<IEntity> {
    return JSON.parse(sessionStorage.getItem('entities') || '[]')
  }

  private _checkIfExists (entity: IEntity) {
    return !!this._entities.find(element => element.name === entity.name && element.surname === entity.surname)
  }

  getEntities(): Observable<Array<IEntity>> {
    return new Observable((observer) => {
      const persisted = this._getPersistedEntities()
      observer.next(persisted.length ? persisted : this._entities)
    })
  }

  addEntity(entity: IEntity): Observable<Array<IEntity>> {
    if(this._checkIfExists(entity)) throw new Error ('The entity already exists.')
    const newEntity = this._addNextId(entity)
    return new Observable((observer) => {
      this._entities.push(newEntity)
      this._persistEntities()
      observer.next(this._entities)
    })
  }

  updateEntity(entity: IEntity): Observable<Array<IEntity>> {
    return new Observable((observer) => {
      const index = this._entities.map(element => element.id).indexOf(entity.id)
      this._entities[index] = {...entity}
      this._persistEntities()
      observer.next(this._entities)
    })
  }

  deleteEntity(entity: IEntity): Observable<Array<IEntity>> {
    return new Observable((observer) => {
      this._entities = this._entities.filter(element => element.id !== entity.id)
      this._persistEntities()
      observer.next(this._entities)
    })
  }
}
