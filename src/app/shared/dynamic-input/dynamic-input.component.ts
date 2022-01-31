import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounce, interval, Subject} from "rxjs";

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.css']
})
export class DynamicInputComponent implements OnInit {
  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>()
  subject$ = new Subject()
  public prefixText: string = ''
  constructor() { }

  ngOnInit(): void {
    this.subject$
      .pipe(
        debounce(() => interval(500 ))
      )
      .subscribe(() => {
        this.filterChange.emit(this.prefixText)
    })
  }



}
