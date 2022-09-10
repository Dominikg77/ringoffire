import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() name;
  @Input() playerActive: boolean = false;
  @Input() image = '1.webp';
  constructor() {}

  ngOnInit(): void {}
}
