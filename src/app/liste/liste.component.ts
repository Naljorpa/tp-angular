import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BieroService } from '../biero.service';
import { IBiere } from '../ibiere';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EffacerComponent } from '../effacer/effacer.component';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {
  produits: Array<IBiere>;
  colonnesAffichees: string[] = ["nom", "brasserie", "description", "date_ajout", "date_modif", "action"];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id: number;

  dataSource: MatTableDataSource<IBiere>;

  constructor(private bieroServ: BieroService, public dialog: MatDialog) {
    this.produits = [];
    // Crée une nouvelle instance de MatTableDatasouce et l'initialise avec les données de this.produits
    this.dataSource = new MatTableDataSource<IBiere>(this.produits);
  }


  /**
 * Cette fonction est appelée lors de l'initialisation du composant.
 * Elle utilise un service pour récupérer une liste de bières, puis elle initialise la source de données, le paginador et le tri.
 */
  ngOnInit(): void {
    this.bieroServ.getBieres().subscribe((listeBiere) => {
      this.produits = listeBiere.data;
      this.dataSource.data = this.produits;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  /**
   * Cette fonction est appelée lorsqu'un utilisateur saisit du texte dans la zone de recherche.
   * Elle utilise la valeur saisie pour filtrer les données affichées dans la liste.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
 * Cette fonction est appelée lorsqu'un utilisateur clique sur le bouton de suppression d'une bière.
 * Elle ouvre une boîte de dialogue de confirmation et transmet l'ID de la bière à supprimer.
 * Si la suppression est réussie, elle rafraîchit la liste des bières affichées dans le composant.
 */
  openDialog(id: number) {
    //id doit etre assigner a un propriete dans ma classe
    this.id = id;
    const dialogRef = this.dialog.open(EffacerComponent, {
      data: this.id
    });
    dialogRef.afterClosed().subscribe(() => {
      // Rafraichi les données de la page après la fermeture du dialog
      this.bieroServ.getBieres().subscribe((listeBiere) => {
        this.produits = listeBiere.data;
        this.dataSource.data = this.produits;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

}
