import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  icon: string;
  colorClass: string;
  badge?: string;
  badgeClass?: string;
  isWishlisted: boolean;
  isNew?: boolean;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ShopPage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories = [
    { value: 'all', label: 'All' },
    { value: 'citrus', label: 'Citrus' },
    { value: 'tropical', label: 'Tropical' },
    { value: 'berry', label: 'Berry' }
  ];
  
  selectedCategory = 'all';
  searchTerm = '';
  sortBy = 'popular';
  showSearch = false;
  cartItemCount = 3;

  ngOnInit() {
    this.initializeProducts();
    this.filteredProducts = [...this.products];
  }

  initializeProducts() {

    const orangeProducts = this.createProducts('orange', 'nutrition-outline', 'orange', [
      { name: 'Valencia Orange', desc: 'Pure Valencia orange juice', price: 120, rating: 4.8, reviews: 120 },
      { name: 'Blood Orange Blast', desc: 'Rich blood orange flavor', price: 140, rating: 4.9, reviews: 85, badge: 'New' },
      { name: 'Tangerine Tang', desc: 'Sweet tangerine delight', price: 125, rating: 4.7, reviews: 95 },
      { name: 'Mandarin Magic', desc: 'Fresh mandarin essence', price: 130, rating: 4.6, reviews: 78 },
      { name: 'Orange Sunrise', desc: 'Morning fresh orange', price: 115, rating: 4.8, reviews: 110 }
    ]);

    const lemonProducts = this.createProducts('citrus', 'water-outline', 'lemon', [
      { name: 'Lemon Zest', desc: 'Tangy lemon freshness', price: 110, rating: 4.5, reviews: 92 },
      { name: 'Lemonade Classic', desc: 'Traditional lemonade', price: 105, rating: 4.9, reviews: 150 },
      { name: 'Lime Splash', desc: 'Zesty lime twist', price: 102, rating: 4.7, reviews: 88, oldPrice: 120, badge: '-15%', badgeClass: 'sale' },
      { name: 'Citrus Burst', desc: 'Lemon-lime fusion', price: 125, rating: 4.6, reviews: 75 },
      { name: 'Meyer Lemon Delight', desc: 'Sweet Meyer lemon', price: 135, rating: 4.8, reviews: 102 }
    ]);

    const mangoProducts = this.createProducts('tropical', 'leaf-outline', 'mango', [
      { name: 'Manila Mango', desc: 'Sweet Philippine mango', price: 160, rating: 5.0, reviews: 180 },
      { name: 'Mango Tango', desc: 'Tropical mango blend', price: 155, rating: 4.9, reviews: 145 },
      { name: 'Alphonso Gold', desc: 'Indian Alphonso mango', price: 200, rating: 4.9, reviews: 98, badge: 'Premium' },
      { name: 'Mango Passion', desc: 'Mango with passion fruit', price: 170, rating: 4.8, reviews: 125 },
      { name: 'Green Mango Kick', desc: 'Tangy green mango', price: 145, rating: 4.6, reviews: 87 }
    ]);

    const pineappleProducts = this.createProducts('tropical', 'sparkles-outline', 'pineapple', [
      { name: 'Pineapple Paradise', desc: 'Fresh pineapple juice', price: 140, rating: 4.7, reviews: 112 },
      { name: 'Golden Pineapple', desc: 'Sweet golden variety', price: 150, rating: 4.8, reviews: 95 },
      { name: 'Pineapple Coconut', desc: 'Tropical fusion blend', price: 136, rating: 4.9, reviews: 130, oldPrice: 170, badge: '-20%', badgeClass: 'sale' },
      { name: 'Pineapple Mint', desc: 'Refreshing pineapple-mint', price: 145, rating: 4.6, reviews: 78 },
      { name: 'Pineapple Ginger', desc: 'Spicy ginger twist', price: 155, rating: 4.5, reviews: 65 }
    ]);

    const strawberryProducts = this.createProducts('berry', 'heart-outline', 'strawberry', [
      { name: 'Strawberry Dream', desc: 'Sweet strawberry pure', price: 165, rating: 4.9, reviews: 160 },
      { name: 'Strawberry Banana', desc: 'Classic combo blend', price: 160, rating: 4.8, reviews: 142, badge: 'New' },
      { name: 'Wild Strawberry', desc: 'Forest strawberry flavor', price: 170, rating: 4.7, reviews: 98 },
      { name: 'Strawberry Kiwi', desc: 'Strawberry and kiwi mix', price: 175, rating: 4.9, reviews: 135 },
      { name: 'Strawberry Lemonade', desc: 'Sweet and tangy fusion', price: 150, rating: 4.8, reviews: 118 }
    ]);

    const blueberryProducts = this.createProducts('berry', 'ellipse-outline', 'blueberry', [
      { name: 'Blueberry Blast', desc: 'Pure blueberry juice', price: 180, rating: 4.8, reviews: 105 },
      { name: 'Wild Blueberry', desc: 'Organic wild blueberry', price: 210, rating: 5.0, reviews: 88, badge: 'Premium' },
      { name: 'Blueberry Acai', desc: 'Superfruit combination', price: 195, rating: 4.9, reviews: 92 },
      { name: 'Blueberry Pomegranate', desc: 'Antioxidant-rich blend', price: 185, rating: 4.7, reviews: 76 },
      { name: 'Blueberry Lemon', desc: 'Tart and sweet harmony', price: 175, rating: 4.8, reviews: 94 }
    ]);

    this.products = [
      ...orangeProducts,
      ...lemonProducts,
      ...mangoProducts,
      ...pineappleProducts,
      ...strawberryProducts,
      ...blueberryProducts
    ];
  }

  createProducts(category: string, icon: string, colorClass: string, data: any[]): Product[] {
    return data.map((item, index) => ({
      id: Date.now() + index,
      category,
      icon,
      colorClass,
      name: item.name,
      description: item.desc,
      price: item.price,
      oldPrice: item.oldPrice,
      rating: item.rating,
      reviews: item.reviews,
      badge: item.badge,
      badgeClass: item.badgeClass,
      isWishlisted: false,
      isNew: item.badge === 'New'
    }));
  }

  filterProducts() {
    let filtered = [...this.products];
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    this.filteredProducts = filtered;
    this.sortProducts();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
    }
  }

  toggleWishlist(product: Product) {
    product.isWishlisted = !product.isWishlisted;
  }

  addToCart(product: Product) {
    this.cartItemCount++;
    console.log('Added to cart:', product.name);
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchTerm = '';
      this.filterProducts();
    }
  }

  openFilters() {
    console.log('Open filters');
  }

  clearFilters() {
    this.selectedCategory = 'all';
    this.searchTerm = '';
    this.sortBy = 'popular';
    this.filterProducts();
  }
}