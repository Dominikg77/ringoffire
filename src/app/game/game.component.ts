import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
currentCard: string = '';
  game: Game;

  games$: Observable<any>;
  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { 
    const coll= collection(firestore, 'games');
this.games$ = collectionData(coll);

this.games$.subscribe((newgame)=>{
  console.log('new game',newgame )
})
  }

  ngOnInit(): void {
   this.newGame();
   // this.route.params.subscribe((params)=>{
//console.log(params)
  //  })
};


async newGame(){
this.game = new Game ();
 const coll = collection(this.firestore, 'games');
 let gameInfo = await  addDoc(coll, this.game.toJson());
 console.log('Das ist die Game ID',gameInfo)
}

  takeCard(){
    if(!this.pickCardAnimation){
this.currentCard = this.game.stack.pop(); // greift auf das letzt element im array zu und entfert es dann anschliessend
    this.pickCardAnimation = true;

this.game.currentPlayer++;
this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // % modulu für die länge z.b. 0 1 2 / 0 1 2 ....
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
      if(name){ // existiert der name zweiter step ist der name länger als eins
   this.game.players.push(name);
  }
});
  }
}





