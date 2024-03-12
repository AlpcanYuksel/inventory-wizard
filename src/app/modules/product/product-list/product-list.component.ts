import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../service/product.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productList: any[] = [];
  categoryList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  navigateCreateProduct(){
    this.router.navigate(['./product-create'], { relativeTo: this.route });
  }

  navigateUpdateProduct(){
    this.router.navigate(['./product-update'], { relativeTo: this.route });
  }

  ngOnInit(): void{
    forkJoin({
      products: this.productService.getProducts(),
      categories: this.productService.getCategories()
    }).subscribe(
      (response) => {
        this.productList = response.products.data;
        this.categoryList = response.categories.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  shortenUUID(uuid: string): string {
    return uuid.split('-')[0];
  }

  convertToOrdinal(index: number): string {
    return (index + 1).toString();
  }
} 
