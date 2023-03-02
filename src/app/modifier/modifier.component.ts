import { Component, Input, OnInit } from '@angular/core';
import { IBiere } from '../ibiere';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BieroService } from '../biero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EffacerComponent } from '../effacer/effacer.component';
import { MatDialog } from '@angular/material/dialog';
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

  /**
 * Initialise le formulaire de modification de la bière avec les données de la bière sélectionnée.
 * Les données sont récupérées à partir de l'ID de la bière dans l'URL.
 */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bieroServ.getUneBiere(params['id']).subscribe((biere: any) => {
        this.biere = biere.data;
        this.modifForm = this.formBuilder.group({
          nom: [this.biere?.nom, [Validators.required, Validators.minLength(2)]],
          description: [this.biere?.description, [Validators.required, Validators.minLength(2)]],
          brasserie: [this.biere?.brasserie, [Validators.required, Validators.minLength(2)]]
        });
      })
    })

  }

  /**
 * Remet le formulaire de modification à l'état initial avec les données de la bière actuelle.
 */
  annuler() {
    console.log(this.modifForm);
    this.modifForm.controls["nom"].setValue(this.biere.nom);
    this.modifForm.controls["brasserie"].setValue(this.biere.brasserie);
    this.modifForm.controls["description"].setValue(this.biere.description);
  }

  /**
 * Modifie la bière avec les nouvelles données entrées dans le formulaire.
 * Les données sont envoyées au serveur via le service de bières.
 */
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

  /**
 * Ouvre une boîte de dialogue pour confirmer la suppression de la bière actuelle.
 * Les données sont envoyées à la boîte de dialogue via l'ID de la bière actuelle.
 */
  openDialog() {
    const dialogRef = this.dialog.open(EffacerComponent, {
      data: this.biere?.id_biere
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['produit']);
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
