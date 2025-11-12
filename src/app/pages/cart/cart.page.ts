import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  badge?: string;
  oldPrice?: number;
  icon: string;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class CartPage implements OnInit {
  cart: CartItem[] = [];
  promoCode: string = '';
  discount: number = 0;
  deliveryFee: number = 50;

  private promoCodes: { [key: string]: number } = {
    'JUICE10': 10,
    'JUICE20': 20,
    'FREESHIP': 0,
    'WELCOME50': 50,
  };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  get cartItemCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get cartTotal(): number {
    const fee = this.promoCode.toUpperCase() === 'FREESHIP' ? 0 : this.deliveryFee;
    return this.subtotal + fee - this.discount;
  }

  updateQuantity(productId: number, change: number) {
    const item = this.cart.find(i => i.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
      }
    }
  }

  async removeFromCart(productId: number) {
    const alert = await this.alertController.create({
      header: 'Remove Item',
      message: 'Are you sure you want to remove this item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          role: 'confirm',
          handler: () => {
            this.cart = this.cart.filter(item => item.id !== productId);
            this.saveCart();
            this.showToast('Item removed from cart');
          }
        }
      ]
    });

    await alert.present();
  }

  async clearCart() {
    const alert = await this.alertController.create({
      header: 'Clear Cart',
      message: 'Are you sure you want to remove all items from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear All',
          role: 'confirm',
          handler: () => {
            this.cart = [];
            this.discount = 0;
            this.promoCode = '';
            this.saveCart();
            this.showToast('Cart cleared');
          }
        }
      ]
    });

    await alert.present();
  }

  async applyPromoCode() {
    const code = this.promoCode.toUpperCase().trim();
    
    if (!code) {
      this.showToast('Please enter a promo code', 'warning');
      return;
    }

    if (code === 'FREESHIP') {
      this.showToast('Free shipping applied!', 'success');
      return;
    }

    if (this.promoCodes[code]) {
      const discountPercent = this.promoCodes[code];
      if (discountPercent <= 50) {
        this.discount = Math.round((this.subtotal * discountPercent) / 100);
      } else {
        this.discount = discountPercent;
      }
      this.showToast(`Promo code applied! ₱${this.discount} discount`, 'success');
    } else {
      this.showToast('Invalid promo code', 'danger');
      this.discount = 0;
    }
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color
    });
    await toast.present();
  }

  getProductColorClass(subcategory: string): string {
    const colors: { [key: string]: string } = {
      'orange': 'orange',
      'lemon': 'lemon',
      'mango': 'mango',
      'pineapple': 'pineapple',
      'strawberry': 'strawberry',
      'blueberry': 'blueberry'
    };
    return colors[subcategory] || '';
  }
}