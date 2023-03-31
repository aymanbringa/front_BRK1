import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../model/cartitem';
import { Commande } from '../model/commande';
import { CartitemService } from '../_services/cartitem.service';
import { CommandeService } from '../_services/commande.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  commande: Commande = new Commande();
  cartItems: CartItem[] = [];

  constructor(private commandeService: CommandeService, private cartservice:CartitemService, private storageService:StorageService,private router: Router) { }
  ngOnInit(): void {
    const userId = this.storageService.getUser()?.id;
    const userName = this.storageService.getUser()?.userName;
    const usermail = this.storageService.getUser()?.email;


    this.commande.user.id=userId;
    this.commande.user.nom=userName;
    this.commande.user.email=usermail;
    console.log(userId,userName);
  }
  

  onSubmit() {
    const userId = this.storageService.getUser()?.id;
    const userName = this.storageService.getUser().nom;
    const usermail = this.storageService.getUser()?.email;

    this.commande.cart = new CartItem();

    console.log(this.commande.cart.id)
    console.log("kjshdkjdshkdjsh",userId,userName);

    this.commandeService.createCommande(this.commande,userId).subscribe(() => {
      this.router.navigate(['/commandes']);
    });
  }
}
