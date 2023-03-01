import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IBiere } from '../ibiere';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BieroService } from '../biero.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  @Input() biere: IBiere;
  biereForm: FormGroup;
  
  constructor(private bieroServ: BieroService, private formBuilder: FormBuilder,  private router: Router) {
     
  }

  ngOnInit(): void {
    this.biereForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      brasserie: ['', [Validators.required, Validators.minLength(2)]]
    });
  
  }

  annuler() {
    console.log(this.biereForm);
    this.biereForm.controls["nom"].setValue(this.biere.nom);
    this.biereForm.controls["brasserie"].setValue(this.biere.brasserie);
    this.biereForm.controls["description"].setValue(this.biere.description);
  }

  ajouter() {
    let uneBiere: IBiere = this.biereForm.value;
    this.bieroServ.ajouterBiere(uneBiere).subscribe((retour) => {
      console.log(retour);
      this.router.navigate(['produit']);
    });
    
  }


}