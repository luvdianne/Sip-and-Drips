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

interface OrderData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  barangay: string;
  city: string;
  postalCode: string;
  notes: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVV?: string;
  gcashNumber?: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class CheckoutPage implements OnInit {
  cart: CartItem[] = [];
  currentStep: number = 1;
  agreedToTerms: boolean = false;
  isProcessing: boolean = false;
  discount: number = 0;
  deliveryFee: number = 50;

  orderData: OrderData = {
    fullName: '',
    phone: '',
    email: '',
    address: '',
    barangay: '',
    city: 'Quezon City',
    postalCode: '',
    notes: '',
    paymentMethod: 'cod'
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadCart();
    this.loadCheckoutData();
    
    if (this.cart.length === 0) {
      this.router.navigate(['/shop']);
      this.showToast('Your cart is empty', 'warning');
    }
  }

  get cartItemCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get cartTotal(): number {
    return this.subtotal + this.deliveryFee - this.discount;
  }

  isStep1Valid(): boolean {
    return !!(
      this.orderData.fullName &&
      this.orderData.phone &&
      this.orderData.address &&
      this.orderData.barangay &&
      this.orderData.city
    );
  }

  nextStep() {
    if (this.currentStep === 1 && !this.isStep1Valid()) {
      this.showToast('Please fill in all required fields', 'warning');
      return;
    }

    if (this.currentStep === 2 && !this.orderData.paymentMethod) {
      this.showToast('Please select a payment method', 'warning');
      return;
    }

    if (this.currentStep < 3) {
      this.currentStep++;
      this.saveCheckoutData();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  editStep(step: number) {
    this.currentStep = step;
  }

  async placeOrder() {
    if (!this.agreedToTerms) {
      this.showToast('Please agree to the terms and conditions', 'warning');
      return;
    }

    this.isProcessing = true;

    setTimeout(async () => {
      const order = {
        orderId: this.generateOrderId(),
        items: this.cart,
        customerInfo: this.orderData,
        subtotal: this.subtotal,
        deliveryFee: this.deliveryFee,
        discount: this.discount,
        total: this.cartTotal,
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      this.saveOrder(order);
      localStorage.removeItem('cart');
      this.clearCheckoutData();

      this.isProcessing = false;

      this.router.navigate(['/order-success'], {
        queryParams: { orderId: order.orderId }
      });
    }, 2000);
  }

  private generateOrderId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `JC${timestamp}${random}`;
  }

  private saveOrder(order: any) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  getPaymentMethodName(): string {
    const methods: { [key: string]: string } = {
      'cod': 'Cash on Delivery',
      'gcash': 'GCash',
      'card': 'Credit/Debit Card',
      'bank': 'Bank Transfer'
    };
    return methods[this.orderData.paymentMethod] || 'Not selected';
  }

  getPaymentIcon(): string {
    const icons: { [key: string]: string } = {
      'cod': 'cash-outline',
      'gcash': 'phone-portrait-outline',
      'card': 'card-outline',
      'bank': 'business-outline'
    };
    return icons[this.orderData.paymentMethod] || 'card-outline';
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }

    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      const data = JSON.parse(cartData);
      this.discount = data.discount || 0;
    }
  }

  private loadCheckoutData() {
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      this.orderData = { ...this.orderData, ...JSON.parse(savedData) };
    }
  }

  private saveCheckoutData() {
    localStorage.setItem('checkoutData', JSON.stringify(this.orderData));
  }

  private clearCheckoutData() {
    localStorage.removeItem('checkoutData');
    localStorage.removeItem('cartData');
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