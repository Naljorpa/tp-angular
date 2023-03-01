import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IBiere } from '../ibiere';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BieroService } from '../biero.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { EffacerComponent } from '../effacer/effacer.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierComponent implements OnInit {
  @Input() produits: Array<IBiere>;
  @Input() produit: IBiere;
  modifForm: FormGroup;
  biere: IBiere;
  id: number;

  constructor(private bieroServ: BieroService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.produits = [];

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bieroServ.getUneBiere(params['id']).subscribe((biere: any) => {
        this.biere = biere.data;
        this.modifForm = this.formBuilder.group({
          nom: [this.biere?.nom],
          description: [this.biere?.description],
          brasserie: [this.biere?.brasserie]
        });
      })
    })
    
  }

  annuler() {
    console.log(this.modifForm);
    this.modifForm.controls["nom"].setValue(this.biere.nom);
    this.modifForm.controls["brasserie"].setValue(this.biere.brasserie);
    this.modifForm.controls["description"].setValue(this.biere.description);
  }

  modifier() {
    let uneBiere: IBiere = this.modifForm.value;
    this.bieroServ.modifierBiere(this.biere.id_biere, uneBiere).subscribe((retour) => {
      this.biere.nom = uneBiere.nom;
      this.biere.brasserie = uneBiere.brasserie;
      this.biere.description = uneBiere.description;
      this.openSnackBar('Bière modifiée avec succès', 'Fermer')
      this.router.navigate(['produit']);
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(EffacerComponent, {
      data: this.biere?.id_biere
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['produit']);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, // time in milliseconds the snackbar should be displayed
    });
  }

}
