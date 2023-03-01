import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BieroService } from '../biero.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-effacer',
  templateUrl: './effacer.component.html',
  styleUrls: ['./effacer.component.scss']
})

//source pour MAT_DIALOG_DATA https://stackoverflow.com/questions/42664974/how-to-pass-data-to-dialog-of-angular-material-2
export class EffacerComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private bieroServ: BieroService, public dialogRef: MatDialogRef<EffacerComponent>) { }

  @Output() deletionCompleted = new EventEmitter<void>();

  ngOnInit() {

  }

  effacer() {
    console.log(this.data);

    // console.log(unProduit);
    this.bieroServ.effacerBiere(this.data).subscribe((retour) => {
      console.log(retour);
      this.deletionCompleted.emit();
    });
  }
}




