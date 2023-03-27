import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from '../../services';

@Component({
  selector: 'app-customer',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$:Observable<boolean>;

  productForm!:FormGroup
  productList: any[] = [];
  isUpdate:boolean=false;
  selectedId:string;

  constructor(
    private fb: FormBuilder,
    private productService:ProductService,
    private toastr : ToastrService
  ) { }
  ngOnInit(): void {
    this.loading$=this.loading.asObservable();
    this.initForm();
    this.getList();
  }
  initForm(): void {
    this.productForm = this.fb.group({
      Name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      availableQty: ['', [Validators.required]]
    });
  }

  onSaveOrUpdate(): void {
    if (this.productForm.invalid){
      alert('Please fill required fields');
      return;
  }
  this.loading.next(true);

  if(this.isUpdate){
//Update Record
this.productService.update(this.productForm.value,this.selectedId).subscribe(res=>{
       this.getList();
       this.loading.next(false);
       alert('Record has been updated.');

});

  }else{
//Save Record
    this.productService.create(this.productForm.value).subscribe(res=>{
      this.productForm.reset();
      this.getList();
      this.loading.next(false);
    },error =>{
      alert('Error occured when saving data.\n' + error);
    },()=>{
      console.log('completed');
    })
    }
  }
    getList():void{
      this.productService.getAll().subscribe(res => {
        this.productList = res;
      } );
    }
    onUpdate(product:any):void{
      this.isUpdate=true,
      this.selectedId=product.id,

      this.productForm.patchValue({
        Name: product.Name,
        brand: product.brand,
        status: product.status,
        description: product.description,
        price: product.price,
        availableQty: product.availableQty
      });
    }

onDelete(id:string):void{
  let isConfirm : boolean=confirm('Are you want to delete this Record?');

  if(isConfirm){
    this.productService.delete(id).subscribe(res =>{
      console.log(res);
      this.getList();
  })
}
}
    onReset(): void{
      this.isUpdate = false;
      this.selectedId = '';
    }
  }
