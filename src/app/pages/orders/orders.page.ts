import { Component, OnInit } from '@angular/core';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class OrdersPage implements OnInit {
  orders: any[] = [];
  filterStatus: string = 'all';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  ionViewWillEnter() {
    this.loadOrders();
  }

  get filteredOrders(): any[] {
    if (this.filterStatus === 'all') {
      return this.orders;
    }
    return this.orders.filter(order => order.status === this.filterStatus);
  }

  onFilterChange() {
    // Filter is automatically applied through getter
  }

  private loadOrders() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
      this.orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }
  }

  viewOrderDetails(order: any) {
    this.router.navigate(['/order-success'], {
      queryParams: { orderId: order.orderId }
    });
  }

  async trackOrder(order: any) {
    const alert = await this.alertController.create({
      header: 'Track Order',
      message: `Order #${order.orderId} is being prepared and will be delivered soon!`,
      buttons: ['OK']
    });
    await alert.present();
  }

  async cancelOrder(order: any) {
    const alert = await this.alertController.create({
      header: 'Cancel Order',
      message: `Are you sure you want to cancel order #${order.orderId}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Cancel',
          role: 'confirm',
          handler: () => {
            order.status = 'cancelled';
            this.saveOrders();
            this.showToast('Order cancelled successfully', 'success');
          }
        }
      ]
    });
    await alert.present();
  }

  async reorder(order: any) {
    const alert = await this.alertController.create({
      header: 'Order Again',
      message: 'Add all items from this order to your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add to Cart',
          role: 'confirm',
          handler: () => {
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            order.items.forEach((item: any) => {
              const existingItem = currentCart.find((ci: any) => ci.id === item.id);
              if (existingItem) {
                existingItem.quantity += item.quantity;
              } else {
                currentCart.push({ ...item });
              }
            });
            
            localStorage.setItem('cart', JSON.stringify(currentCart));
            this.showToast('Items added to cart!', 'success');
            this.router.navigate(['/cart']);
          }
        }
      ]
    });
    await alert.present();
  }

  async rateOrder(order: any) {
    const alert = await this.alertController.create({
      header: 'Rate Your Order',
      message: 'How was your experience?',
      inputs: [
        {
          name: 'rating',
          type: 'number',
          placeholder: 'Rating (1-5)',
          min: 1,
          max: 5
        },
        {
          name: 'review',
          type: 'textarea',
          placeholder: 'Your review (optional)'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: (data) => {
            if (data.rating >= 1 && data.rating <= 5) {
              order.rating = data.rating;
              order.review = data.review;
              this.saveOrders();
              this.showToast('Thank you for your feedback!', 'success');
              return true;
            } else {
              this.showToast('Please enter a valid rating (1-5)', 'warning');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'pending': 'warning',
      'preparing': 'primary',
      'out_for_delivery': 'secondary',
      'delivered': 'success',
      'cancelled': 'danger'
    };
    return colors[status] || 'medium';
  }

  private saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
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