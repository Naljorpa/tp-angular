import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterComponent } from './ajouter/ajouter.component';
// import { GardienLoginGuard } from './gardien-login.guard';
import { ListeComponent } from './liste/liste.component';
import { ModifierComponent } from './modifier/modifier.component';
import { NonTrouveeComponent } from './non-trouvee/non-trouvee.component';

const routes: Routes = [
  {path : "", component:AccueilComponent},
  {path : "produit", component:ListeComponent},
  {path : "ajouter", component:AjouterComponent},
  {path : "modifier/:id", component:ModifierComponent},
  {path : "**", component:NonTrouveeComponent}
// si besoins dans path produit id canActivate:[GardienLoginGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
