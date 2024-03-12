import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../dto/category';
import { Product } from '../dto/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  createProduct(create: any):Observable<any> {
    return this.httpClient.post<any>('/product/create', create);
  }

  updateProduct(update: any): Observable<any>{
    return this.httpClient.post<any>('/product/update', update);
  }

  getCategories():Observable<Category> {
    return this.httpClient.get<Category>('/category');
  }

  getProducts():Observable<Product> {
    return this.httpClient.get<Product>('/product/getall');
  }

  

}
