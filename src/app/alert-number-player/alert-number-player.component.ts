import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-alert-number-player',
  templateUrl: './alert-number-player.component.html',
  styleUrls: ['./alert-number-player.component.scss'],
})
export class AlertNumberPlayerComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }
}
