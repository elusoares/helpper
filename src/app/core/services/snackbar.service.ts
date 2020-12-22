import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) { }

  openSnackBar(message: string, action: string) {
    this.zone.run(() => {
      this.snackBar.open(message, action, {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
  });
  }
}
