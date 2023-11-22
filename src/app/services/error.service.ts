import { Injectable, EventEmitter } from '@angular/core';
import { ModalError } from '../interfaces/error.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public errorEmmiter: EventEmitter<ModalError> = new EventEmitter();

  constructor() { }

  setError(errorStructure: ModalError): void {
    this.errorEmmiter.emit(errorStructure);
  }
}