import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.page.html',
  styleUrls: ['./order-success.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class OrderSuccessPage implements OnInit {
  orderId: string = '';
  order: any = null;
  orderDate: Date = new Date();
  estimatedDelivery: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      if (this.orderId) {
        this.loadOrder();
        this.calculateEstimatedDelivery();
      } else {
        this.router.navigate(['/shop']);
      }
    });
  }

  private loadOrder() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.order = orders.find((o: any) => o.orderId === this.orderId);
    
    if (this.order) {
      this.orderDate = new Date(this.order.orderDate);
    }
  }

  private calculateEstimatedDelivery() {
    const deliveryDate = new Date();
    deliveryDate.setHours(deliveryDate.getHours() + 2);
    
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    
    this.estimatedDelivery = deliveryDate.toLocaleDateString('en-US', options);
  }

  getPaymentMethodName(): string {
    if (!this.order) return '';
    
    const methods: { [key: string]: string } = {
      'cod': 'Cash on Delivery',
      'gcash': 'GCash',
      'card': 'Credit/Debit Card',
      'bank': 'Bank Transfer'
    };
    return methods[this.order.customerInfo.paymentMethod] || 'Not specified';
  }

  getPaymentIcon(): string {
    if (!this.order) return 'card-outline';
    
    const icons: { [key: string]: string } = {
      'cod': 'cash-outline',
      'gcash': 'phone-portrait-outline',
      'card': 'card-outline',
      'bank': 'business-outline'
    };
    return icons[this.order.customerInfo.paymentMethod] || 'card-outline';
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