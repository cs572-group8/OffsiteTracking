import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  emitter = new EventEmitter<string>();
  emitValue(value: any) {
    this.emitter.emit(value);
  }
}
