import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BieroService } from '../biero.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-effacer',
  templateUrl: './effacer.component.html',
  styleUrls: ['./effacer.component.scss']
})

//source pour MAT_DIALOG_DATA https://stackoverflow.com/questions/42664974/how-to-pass-data-to-dialog-of-angular-material-2
export class EffacerComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private bieroServ: BieroService, public dialogRef: MatDialogRef<EffacerComponent>, private snackBar: MatSnackBar) { }

  @Output() deletionCompleted = new EventEmitter<void>();

  ngOnInit() {
  }

  /**
 * Cette fonction est appelée lors de la suppression d'une bière.
 * Elle utilise un service pour supprimer la bière en utilisant les données passées en entrée.
 * Si la suppression est réussie, elle émet un événement pour informer les composants parent de la suppression.
 */
  effacer() {
    this.bieroServ.effacerBiere(this.data).subscribe((retour) => {
      console.log(retour);
      // Ici je n'arrivais pas à accéder à la propriété data de retour donc j'ai du fouillé pour trouver hasOwnProperty.
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
      if(retour.hasOwnProperty('data')){
        this.openSnackBar('BIÈRE DÉTRUITE!!!', 'Fermer')
      }
      this.deletionCompleted.emit();
    });
  }

     /**
 * Affiche un message de succès dans un snackbar.
 * Le message est affiché pendant 3 secondes.
 */
     openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000
      });
    }
}




