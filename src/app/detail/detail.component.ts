import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { BieroService } from '../biero.service';
import { IBiere } from '../ibiere';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{
  biere:IBiere;

  constructor(private authServ:AuthService, 
              private route:ActivatedRoute, 
              private bieroServ:BieroService){ }
  
  ngOnInit(): void {
    this.authServ.setNomPage("Détail du produit");
    
    this.route.params.subscribe((params)=>{
      this.bieroServ.getUneBiere(params['id']).subscribe((biere:any)=>{
        console.log(biere)
        this.biere = biere.data;
      })
    })
    console.log(this.route);

  }
}
