import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ShopPage implements OnInit {
  products: Product[] = [
    // CITRUS - Orange (5 products)
    { id: 1, name: 'Valencia Orange', description: 'Pure Valencia orange juice', price: 120, category: 'citrus', subcategory: 'orange', rating: 4.8, reviews: 120, icon: 'nutrition-outline' },
    { id: 2, name: 'Blood Orange Blast', description: 'Rich blood orange flavor', price: 140, category: 'citrus', subcategory: 'orange', rating: 4.9, reviews: 85, badge: 'New', icon: 'nutrition-outline' },
    { id: 3, name: 'Tangerine Tang', description: 'Sweet tangerine delight', price: 125, category: 'citrus', subcategory: 'orange', rating: 4.7, reviews: 95, icon: 'nutrition-outline' },
    { id: 4, name: 'Mandarin Magic', description: 'Fresh mandarin essence', price: 130, category: 'citrus', subcategory: 'orange', rating: 4.6, reviews: 78, icon: 'nutrition-outline' },
    { id: 5, name: 'Orange Sunrise', description: 'Morning fresh orange', price: 115, category: 'citrus', subcategory: 'orange', rating: 4.8, reviews: 110, icon: 'nutrition-outline' },
    
    // CITRUS - Lemon (5 products)
    { id: 6, name: 'Lemon Zest', description: 'Tangy lemon freshness', price: 110, category: 'citrus', subcategory: 'lemon', rating: 4.5, reviews: 92, icon: 'water-outline' },
    { id: 7, name: 'Lemonade Classic', description: 'Traditional lemonade', price: 105, category: 'citrus', subcategory: 'lemon', rating: 4.9, reviews: 150, icon: 'water-outline' },
    { id: 8, name: 'Lime Splash', description: 'Zesty lime twist', price: 102, category: 'citrus', subcategory: 'lemon', rating: 4.7, reviews: 88, badge: '-15%', oldPrice: 120, icon: 'water-outline' },
    { id: 9, name: 'Citrus Burst', description: 'Lemon-lime fusion', price: 125, category: 'citrus', subcategory: 'lemon', rating: 4.6, reviews: 75, icon: 'water-outline' },
    { id: 10, name: 'Meyer Lemon Delight', description: 'Sweet Meyer lemon', price: 135, category: 'citrus', subcategory: 'lemon', rating: 4.8, reviews: 102, icon: 'water-outline' },
    
    // TROPICAL - Mango (5 products)
    { id: 11, name: 'Manila Mango', description: 'Sweet Philippine mango', price: 160, category: 'tropical', subcategory: 'mango', rating: 5.0, reviews: 180, icon: 'leaf-outline' },
    { id: 12, name: 'Mango Tango', description: 'Tropical mango blend', price: 155, category: 'tropical', subcategory: 'mango', rating: 4.9, reviews: 145, icon: 'leaf-outline' },
    { id: 13, name: 'Alphonso Gold', description: 'Indian Alphonso mango', price: 200, category: 'tropical', subcategory: 'mango', rating: 4.9, reviews: 98, badge: 'Premium', icon: 'leaf-outline' },
    { id: 14, name: 'Mango Passion', description: 'Mango with passion fruit', price: 170, category: 'tropical', subcategory: 'mango', rating: 4.8, reviews: 125, icon: 'leaf-outline' },
    { id: 15, name: 'Green Mango Kick', description: 'Tangy green mango', price: 145, category: 'tropical', subcategory: 'mango', rating: 4.6, reviews: 87, icon: 'leaf-outline' },
    
    // TROPICAL - Pineapple (5 products)
    { id: 16, name: 'Pineapple Paradise', description: 'Fresh pineapple juice', price: 140, category: 'tropical', subcategory: 'pineapple', rating: 4.7, reviews: 112, icon: 'sparkles-outline' },
    { id: 17, name: 'Golden Pineapple', description: 'Sweet golden variety', price: 150, category: 'tropical', subcategory: 'pineapple', rating: 4.8, reviews: 95, icon: 'sparkles-outline' },
    { id: 18, name: 'Pineapple Coconut', description: 'Tropical fusion blend', price: 136, category: 'tropical', subcategory: 'pineapple', rating: 4.9, reviews: 130, badge: '-20%', oldPrice: 170, icon: 'sparkles-outline' },
    { id: 19, name: 'Pineapple Mint', description: 'Refreshing pineapple-mint', price: 145, category: 'tropical', subcategory: 'pineapple', rating: 4.6, reviews: 78, icon: 'sparkles-outline' },
    { id: 20, name: 'Pineapple Ginger', description: 'Spicy ginger twist', price: 155, category: 'tropical', subcategory: 'pineapple', rating: 4.5, reviews: 65, icon: 'sparkles-outline' },
    
    // BERRY - Strawberry (5 products)
    { id: 21, name: 'Strawberry Dream', description: 'Sweet strawberry pure', price: 165, category: 'berry', subcategory: 'strawberry', rating: 4.9, reviews: 160, icon: 'heart-outline' },
    { id: 22, name: 'Strawberry Banana', description: 'Classic combo blend', price: 160, category: 'berry', subcategory: 'strawberry', rating: 4.8, reviews: 142, badge: 'New', icon: 'heart-outline' },
    { id: 23, name: 'Wild Strawberry', description: 'Forest strawberry flavor', price: 170, category: 'berry', subcategory: 'strawberry', rating: 4.7, reviews: 98, icon: 'heart-outline' },
    { id: 24, name: 'Strawberry Kiwi', description: 'Strawberry and kiwi mix', price: 175, category: 'berry', subcategory: 'strawberry', rating: 4.9, reviews: 135, icon: 'heart-outline' },
    { id: 25, name: 'Strawberry Lemonade', description: 'Sweet and tangy fusion', price: 150, category: 'berry', subcategory: 'strawberry', rating: 4.8, reviews: 118, icon: 'heart-outline' },
    
    // BERRY - Blueberry (5 products)
    { id: 26, name: 'Blueberry Blast', description: 'Pure blueberry juice', price: 180, category: 'berry', subcategory: 'blueberry', rating: 4.8, reviews: 105, icon: 'ellipse-outline' },
    { id: 27, name: 'Wild Blueberry', description: 'Organic wild blueberry', price: 210, category: 'berry', subcategory: 'blueberry', rating: 5.0, reviews: 88, badge: 'Premium', icon: 'ellipse-outline' },
    { id: 28, name: 'Blueberry Acai', description: 'Superfruit combination', price: 195, category: 'berry', subcategory: 'blueberry', rating: 4.9, reviews: 92, icon: 'ellipse-outline' },
    { id: 29, name: 'Blueberry Pomegranate', description: 'Antioxidant-rich blend', price: 185, category: 'berry', subcategory: 'blueberry', rating: 4.7, reviews: 76, icon: 'ellipse-outline' },
    { id: 30, name: 'Blueberry Lemon', description: 'Tart and sweet harmony', price: 175, category: 'berry', subcategory: 'blueberry', rating: 4.8, reviews: 94, icon: 'ellipse-outline' },
  ];

  cart: CartItem[] = [];
  selectedCategory: string = 'all';
  sortBy: string = 'popular';
  searchQuery: string = '';
  wishlist: number[] = [];
  
  // NEW PROPERTIES FOR CART SUMMARY
  discount: number = 0;
  deliveryFee: number = 50;
  promoCode: string = '';

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    this.loadCart();
    this.loadWishlist();
    this.loadCartData();
  }

  get filteredProducts(): Product[] {
    let filtered = this.products;

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    filtered = [...filtered].sort((a, b) => {
      if (this.sortBy === 'price-low') return a.price - b.price;
      if (this.sortBy === 'price-high') return b.price - a.price;
      if (this.sortBy === 'newest') return b.id - a.id;
      return b.rating - a.rating;
    });

    return filtered;
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

  addToCart(product: Product, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
    this.showToast(`Added ${product.name} to cart`, 'success');
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

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.showToast('Item removed from cart', 'warning');
  }

  clearCart() {
    this.cart = [];
    this.discount = 0;
    this.promoCode = '';
    this.saveCart();
    localStorage.removeItem('cartData');
    this.showToast('Cart cleared', 'dark');
  }

  applyPromoCode() {
    const validCodes: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'SAVE50': 50,
      'FIRSTORDER': 100,
      'WELCOME': 25
    };

    if (this.promoCode && validCodes[this.promoCode.toUpperCase()]) {
      this.discount = validCodes[this.promoCode.toUpperCase()];
      this.showToast(`Promo code applied! You saved ₱${this.discount}`, 'success');
      
      // Save discount to localStorage
      const cartData = { discount: this.discount };
      localStorage.setItem('cartData', JSON.stringify(cartData));
    } else if (this.promoCode) {
      this.showToast('Invalid promo code', 'danger');
      this.discount = 0;
    }
  }

  toggleWishlist(productId: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast('Removed from wishlist', 'dark');
    } else {
      this.wishlist.push(productId);
      this.showToast('Added to wishlist', 'success');
    }
    this.saveWishlist();
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.includes(productId);
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
  }

  onSortChange(event: any) {
    this.sortBy = event.detail.value;
  }

  onSearchChange(event: any) {
    this.searchQuery = event.detail.value || '';
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

  private loadCartData() {
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      const data = JSON.parse(cartData);
      this.discount = data.discount || 0;
    }
  }

  private loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      this.wishlist = JSON.parse(savedWishlist);
    }
  }

  private saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
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