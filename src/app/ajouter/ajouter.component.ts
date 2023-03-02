import { Component, Input, OnInit } from '@angular/core';
import { IBiere } from '../ibiere';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BieroService } from '../biero.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  @Input() biere: IBiere;
  biereForm: FormGroup;

  constructor(private bieroServ: BieroService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
  }

  /**
 * Cette fonction est exécutée lors de la création du composant.
 * Elle initialise un objet FormGroup avec des validateurs pour chaque champ du formulaire.
 */
  ngOnInit(): void {
    this.biereForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      brasserie: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  /**
 * Cette fonction est appelée lors de l'annulation de l'ajout d'une bière.
 * Elle réinitialise les champs du formulaire avec les valeurs de l'objet biere.
 */
  annuler() {
    console.log(this.biereForm);
    this.biereForm.controls["nom"].setValue(this.biere.nom);
    this.biereForm.controls["brasserie"].setValue(this.biere.brasserie);
    this.biereForm.controls["description"].setValue(this.biere.description);
  }

  /**
 * Cette fonction est appelée lors de l'ajout d'une bière.
 * Elle récupère les valeurs du formulaire et ajoute la bière via un appel à un service.
 * Si l'ajout est réussi, elle affiche un message de confirmation et redirige l'utilisateur vers la liste des produits.
 */
  ajouter() {
    console.log(this.biereForm.errors);
    let uneBiere: IBiere = this.biereForm.value;
    this.bieroServ.ajouterBiere(uneBiere).subscribe((retour) => {
      this.openSnackBar('Bière ajoutée avec succèes', 'Fermer')
      this.router.navigate(['produit']);
    });

  }

  /**
 * Cette fonction affiche un message de type snackbar.
 * @param message Le message à afficher.
 * @param action L'action à afficher sur le bouton de fermeture du snackbar.
 */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000, 
    });
  }

}
