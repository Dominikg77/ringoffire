import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['winkboy.svg','pinguin.svg','serious-woman.svg'];

  constructor() { }

  ngOnInit(): void {
  }

}
