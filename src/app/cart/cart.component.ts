import { Component, OnInit } from '@angular/core';
import { CartItem } from '../model/cartitem';
import { CartitemService } from '../_services/cartitem.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private storageService: StorageService,
    private cartItemService: CartitemService
  ) { }

  ngOnInit(): void {
    const userId = this.storageService.getUser()?.id;
    console.log('userId:', userId);

    if (userId) {
      this.cartItemService.getCart(userId).subscribe(
        cartItems => {
          console.log(cartItems);
          this.cartItems = cartItems;
          console.log(this.cartItems);
        },
        error => {
          console.error('Error fetching cart:', error);
        }
      );
    }
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      item.product.prix = item.quantity * item.product.prix;
      this.updateCartItems(this.cartItems);
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    item.product.prix = item.quantity * item.product.prix;
    this.updateCartItems(this.cartItems);
  }

  removeFromCart(productId: number, quantity: number): void {
    this.cartItemService.removeFromCart(productId, quantity).subscribe(() => {
      // Remove the item from the local cartItems array
      const index = this.cartItems.findIndex(item => item.product.id === productId);
      this.cartItems.splice(index, 1);
      this.updateCartItems(this.cartItems);
    });
  }

  updateCartItems(newItems: CartItem[]): void {
    this.cartItems = newItems;
  }
}
