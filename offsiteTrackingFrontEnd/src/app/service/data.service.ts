import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  emitter = new EventEmitter<string>();
  constructor() {
  }

  emitValue(value: any) {
    this.emitter.emit(value);
  }
}
