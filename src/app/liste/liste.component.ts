import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BieroService } from '../biero.service';
import { IBiere } from '../ibiere';
import { IListeBiere } from '../iliste-biere';
import { IProduit } from '../iproduit';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements AfterViewInit{
  produits:Array<IBiere>;
  sontEditable:boolean = false;
  estConnecte:boolean = false;
  colonnesAffichees:string[] = ["id", "nom", "brasserie", "description", "date_ajout", "date_modif"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<IBiere>;


  constructor(private authServ:AuthService, private bieroServ:BieroService){
    this.dataSource = new MatTableDataSource<IBiere>();
    this.produits = [];
    // this.authServ.statutConnexion().subscribe((etat:boolean)=>{
    //   this.estConnecte = etat;
    //   if(this.estConnecte === false){
    //     this.sontEditable = false;
    //   }
    // })
    // this.authServ.setNomPage("Liste");
  
    this.dataSource = new MatTableDataSource<IBiere>(this.produits); 
  }

  ngOnInit(): void {
    this.authServ.statutConnexion().subscribe((etat: boolean) => {
      this.estConnecte = etat;
      if (this.estConnecte === false) {
        this.sontEditable = false;
      }
    });
    this.authServ.setNomPage("Liste");
  }

  ngAfterViewInit() {
    this.bieroServ.getBieres().subscribe((listeBiere) => {
      this.produits = listeBiere.data;
      this.dataSource.data = this.produits;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
