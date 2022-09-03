import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
 game: Game;
  gameId: string;


constructor(private route: ActivatedRoute, private firestore: AngularFirestore,
  public dialog: MatDialog, ) { }
   

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
              console.log('game update', game );
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
      })
    }
  


newGame(){
this.game = new Game ();
}

  takeCard(){
    if(!this.game.pickCardAnimation){
this.game.currentCard = this.game.stack.pop(); // greift auf das letzt element im array zu und entfert es dann anschliessend
this.game.pickCardAnimation = true;
this.game.currentPlayer++;
this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // % modulu für die länge z.b. 0 1 2 / 0 1 2 ....
this.saveGame();    
setTimeout(() => {
      //erst nach einer sekunde die gespielten anzeigen
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame(); 
    }, 1000);
  }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name){ // existiert der name zweiter step ist der name länger als eins
   this.game.players.push(name);
   this.saveGame();
  }
});
  }

saveGame(){
  this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .update(this.game.toJson());
}

}





