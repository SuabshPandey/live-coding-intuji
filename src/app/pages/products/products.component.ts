import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../common/components/card/card.component';
import { ProductsService } from './products.service';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subscription,
  switchMap,
} from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../common/components/loader/loader.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CardComponent,
    FormsModule,
    LoaderComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  private searchQuerySubject = new BehaviorSubject<string>('');

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchProducts();
    // this.searchQuerySubject
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     switchMap((search) => this.fetchProducts(search))
    //   )
    //   .subscribe((res) => {
    //     this.products = res.products;
    //   });
  }

  fetchProducts() {
    return this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res?.products;
        this.loading = false;
      },
      error: (err) => {
        console.log('Error: ', err);
      },
    });
  }
  onSearch(value: string) {
    console.log('Search query:::', this.searchQuery);
    this.searchQuerySubject.next(value.trim());
  }
}
