import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.scss']
})

export class EnteteComponent {
  titre:String = "Administration";
  soustitre:String = "";
  msgConnecter:string = "Se connecter";
  estConnecte:boolean;

  constructor(private authServ:AuthService){
    this.estConnecte = this.authServ.getConnexion();
    this.authServ.getNomPage().subscribe((nom)=>{
      this.soustitre = nom;
    })
  }

  seConnecter(){
    this.estConnecte = !this.estConnecte;
    this.authServ.setConnexion(this.estConnecte);
    if(this.estConnecte){
      this.msgConnecter = "Se déconnecter";
    }else{
      this.msgConnecter = "Se connecter";
    }
    console.log(this.authServ)
    
  }


}
