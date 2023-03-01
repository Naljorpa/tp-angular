import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IBiere } from '../ibiere';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BieroService } from '../biero.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private bieroServ: BieroService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.produits = [];

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bieroServ.getUneBiere(params['id']).subscribe((biere: any) => {
        console.log(biere)
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
      console.log(retour);
      this.biere.nom = uneBiere.nom;
      this.biere.brasserie = uneBiere.brasserie;
      this.biere.description = uneBiere.description;
      this.router.navigate(['produit']);
    });

  }

}
