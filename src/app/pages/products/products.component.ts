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
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../types/paginator';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CardComponent,
    FormsModule,
    LoaderComponent,
    PaginatorModule,
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
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.fetchProducts().subscribe((products) => {
      this.products = products;
    });

    this.searchQuerySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((search) => this.fetchProducts(search))
      )
      .subscribe((filteredProducts) => {
        this.products = filteredProducts;
      });
  }

  fetchProducts(search: string = '') {
    return this.productService.getProducts().pipe(
      switchMap((res) => {
        let filtered = res?.products;

        if (search) {
          filtered = filtered.filter((item: any) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        this.totalRecords = res?.total;
        this.loading = false;

        return [filtered]; // return observable of filtered result
      })
    );
  }
  onSearch(value: string) {
    console.log('Search query:::', this.searchQuery);
    this.searchQuerySubject.next(value.trim());
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
