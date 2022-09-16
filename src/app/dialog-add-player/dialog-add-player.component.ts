import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'],
})
export class DialogAddPlayerComponent implements OnInit {
  name: string = '';
  picture: string = '';

  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}
  allProfilePictures = ['winkboy.svg', 'pinguin.svg', 'serious-woman.svg'];

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }
}
