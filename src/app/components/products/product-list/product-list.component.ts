import { Component, OnInit } from '@angular/core';

//Services
import {ProductService } from '../../../services/product.service';
import {ToastrService} from 'ngx-toastr';

//Class Product
import {Product} from '../../../models/product';
import { element, Key } from 'protractor';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts().snapshotChanges().subscribe(item => {
      this.productList=[];
      item.forEach(element=>{
        let variable = element.payload.toJSON();
        variable["key"]= element.key;
        this.productList.push(variable as Product);
      })
    });
  }

  onEdit(product : Product){
    this.productService.SelectedProduct = Object.assign({},product);
  }

  onDelete(key: string){
    if(confirm('¿Estas Seguro De Querer Eliminar El Producto?')){
      this.productService.deleteProduct(key);
      this.toastr.success('Operación Completada','Eliminación Exitosa!!!');
    }   
  }

}
