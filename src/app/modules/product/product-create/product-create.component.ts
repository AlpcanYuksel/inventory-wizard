import { Component, OnInit  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../core/service/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  categoryList: any[] = [];

  productForm = this.fb.group({
    productName: '',
    categoryId: '',
    costPrice: 0,
    unitPrice: 0,
    quantity: 0,
  });

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {}

  submit() {
    
    this.productService.createProduct(this.productForm.value ).subscribe({
      next: (resp) => {
        this.toastr.success('Ürün Oluşturulmuştur');
        this.router.navigate(['..'], {relativeTo: this.route});
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Hata oluştu");
      }
    });
  }
  
  
  ngOnInit(): void{
    this.productService.getCategories().subscribe({
      next: (resp => {
        this.categoryList = resp.data;        
      }),
      error: (err => {
        console.log(err);
        
      })
    })
  }
  
}
