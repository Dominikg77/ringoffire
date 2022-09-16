import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }
}
