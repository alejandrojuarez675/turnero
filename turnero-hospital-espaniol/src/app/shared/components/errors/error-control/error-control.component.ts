import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { Errors } from '../../../../core/store/reducers/error.reducers';
import * as ErrorSelectors from '../../../../core/store/selectors/error.selectors';

@Component({
  selector: 'app-error-control',
  templateUrl: './error-control.component.html',
})
export class ErrorControlComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<{ error: Errors }>,
  ) { }

  ngOnInit() {
    this.store.select(ErrorSelectors.selectErrorMessages).subscribe(x => this.openDialog(x));
  }

  openDialog(msg: string): void {
    if (msg) {
      this.snackBar.open(msg, 'x', {
        duration: 3000,
      });
    }
  }

}
