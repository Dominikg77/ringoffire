import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
 game: Game;
  gameId: string;
  gameOver = false;


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
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
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
    if(this.game.stack.length == 0){
      this.gameOver= true;
    } else if(!this.game.pickCardAnimation){
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

  editPlayer(playerId: number){
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if(change){
        if(change == 'DELETE'){
          this.game.players.splice(playerId),1;
          this.game.player_images.splice(playerId),1;
        }else{
          this.game.player_images[playerId]=change;
      }
      this.saveGame();
    }
});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  
    dialogRef.afterClosed().subscribe((name: string) => {
      if(name){ // existiert der name zweiter step ist der name länger als eins
   this.game.players.push(name);
 this.game.player_images.push('1.webp');
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





