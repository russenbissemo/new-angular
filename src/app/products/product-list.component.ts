import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit , OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean = false;
  erroMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredProducts = this.performFilter(value);
  }
  filteredProducts: IProduct[] = [];

  products: IProduct[] = [];

  constructor(private productService: ProductService) {}
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products; 
        this.filteredProducts = this.products;
      },
      error: err => this.erroMessage = err
    });
   
  }
  ngOnDestroy() {
    this.sub.unsubscribe();

  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
