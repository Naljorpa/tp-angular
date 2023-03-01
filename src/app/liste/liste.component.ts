import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { BieroService } from '../biero.service';
import { IBiere } from '../ibiere';
import { IListeBiere } from '../iliste-biere';
import { IProduit } from '../iproduit';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EffacerComponent } from '../effacer/effacer.component';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  produits: Array<IBiere>;
  // sontEditable:boolean = false;
  // estConnecte:boolean = false;
  colonnesAffichees: string[] = ["nom", "brasserie", "description", "date_ajout", "date_modif", "action"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id: number;

  // dialogRef: MatDialogRef<EffacerComponent>;


  dataSource: MatTableDataSource<IBiere>;


  constructor(private authServ: AuthService, private bieroServ: BieroService, public dialog: MatDialog,) {
    this.produits = [];

    // this.authServ.statutConnexion().subscribe((etat:boolean)=>{
    //   this.estConnecte = etat;
    //   if(this.estConnecte === false){
    //     this.sontEditable = false;
    //   }
    // })
    // this.authServ.setNomPage("Liste");

    // Crée une nouvelle instance de MatTableDatasouce et l'initialise avec les données de this.produits
    this.dataSource = new MatTableDataSource<IBiere>(this.produits);
  }


  /**
   * Génère la liste des bières et l'assigne à this.produits et à dataSource. Nourrit ensuite le sorting et le paginator.
   */
  ngOnInit(): void {
    this.bieroServ.getBieres().subscribe((listeBiere) => {
      this.produits = listeBiere.data;
      this.dataSource.data = this.produits;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // this.authServ.statutConnexion().subscribe((etat: boolean) => {
    //   this.estConnecte = etat;
    //   if (this.estConnecte === false) {
    //     this.sontEditable = false;
    //   }
    // });
    // this.authServ.setNomPage("Liste");
  }

  /**
   * Après que la vue a été initialisé, génère la liste des bières et l'assigne à this.produits et à dataSource. Nourrit ensuite le sorting et le paginator.
   */
  // ngAfterViewInit() {

  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    //id doit etre assigner a un propriete dans ma classe
    console.log(id);

    this.id = id;
    const dialogRef = this.dialog.open(EffacerComponent, {
      data: this.id
    });
    dialogRef.afterClosed().subscribe(() => {
      // Refresh the page data after the dialog is closed
      this.bieroServ.getBieres().subscribe((listeBiere) => {
        this.produits = listeBiere.data;
        this.dataSource.data = this.produits;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }




  /*verifConnexion(){
    //console.log(this.authServ.etatConnexion)
    if(!this.authServ.getConnexion() && this.sontEditable == true){
      this.sontEditable = false;
    }
  }*/
  // estEnSolde(unProduit:IProduit){
  //   return (unProduit.prix < 15 && unProduit.rabais);
  // }

  // verifEditable(unProduit:IProduit):boolean{
  //   let res:boolean = false;
  //   if(this.sontEditable || unProduit.estEditable){
  //     res = true;
  //   }
  //   return res;
  // }


}
