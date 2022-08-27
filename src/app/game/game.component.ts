import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
currentCard: string = '';
  game: Game


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();

  }

newGame(){
this.game = new Game ();
console.log(this.game);

}

  takeCard(){
    if(!this.pickCardAnimation){
this.currentCard = this.game.stack.pop(); // greift auf das letzt element im array zu und entfert es dann anschliessend
    this.pickCardAnimation = true;


    setTimeout(() => {
      //erst nach einer sekunde die gespielten anzeigen
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  
    dialogRef.afterClosed().subscribe((name: string) => {
   this.game.players.push(name);
    });
  }
}





