import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BieroService } from '../biero.service';
import { IBiere } from '../ibiere';
import { IListeBiere } from '../iliste-biere';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit{
  produits:Array<IBiere>;
  sontEditable:boolean = false;
  estConnecte:boolean = false;

  constructor(private authServ:AuthService, private bieroServ:BieroService){
    this.produits = [];/*[...Array(5)].map((item, index)=>{
      return {  nom : "element " + index, 
              fabricant: "brasserie xyz", 
              prix: (10 + index*2), 
              id:1+index,
              rabais : !(index % 3)};
    })*/
    //console.log(this.produits)

    //console.log(this.authServ.etatConnexion)
    
  }

  ngOnInit(): void {
    this.authServ.statutConnexion().subscribe((etat:boolean)=>{
      this.estConnecte = etat;
      if(this.estConnecte === false){
        this.sontEditable = false;
      }
    })
    this.authServ.setNomPage("Liste");
    this.bieroServ.getBieres().subscribe((listeBiere)=>{
      this.produits = listeBiere.data;
    });

  }
  /*verifConnexion(){
    //console.log(this.authServ.etatConnexion)
    if(!this.authServ.getConnexion() && this.sontEditable == true){
      this.sontEditable = false;
    }
  }*/
  estEnSolde(unProduit:IProduit){
    return (unProduit.prix < 15 && unProduit.rabais);
  }

  verifEditable(unProduit:IProduit):boolean{
    let res:boolean = false;
    if(this.sontEditable || unProduit.estEditable){
      res = true;
    }
    return res;
  }

}
