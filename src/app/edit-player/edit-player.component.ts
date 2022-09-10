import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent implements OnInit {
  allProfilePictures = ['winkboy.svg', 'pinguin.svg', 'serious-woman.svg'];

  constructor(private dialogRef: MatDialogRef<EditPlayerComponent>) {}

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close();
  }
}
