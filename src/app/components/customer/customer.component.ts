import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
//import { CustomerService } from 'src/app/services/customer.service';


import { CustomerService } from '../../services';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  loading:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  loading$:Observable<boolean>;

  customerForm!:FormGroup
  customerList: any[] = [];
  isUpdate:boolean=false;
  selectedId:string;

  constructor(
    private fb: FormBuilder,
    private customerService:CustomerService,
    private toastr : ToastrService
  ) { }
  ngOnInit(): void {
    this.loading$=this.loading.asObservable();
    this.initForm();
    this.getList();
  }
  initForm(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  onSaveOrUpdate(): void {
    if (this.customerForm.invalid){
      alert('Please fill required fields');
      return;
  }
  this.loading.next(true);

  if(this.isUpdate){
//Update Record
this.customerService.update(this.customerForm.value,this.selectedId).subscribe(res=>{
       this.getList();
       this.loading.next(false);
       alert('Record has been updated.');

});

  }else{
//Save Record
    this.customerService.create(this.customerForm.value).subscribe(res=>{
      this.customerForm.reset();
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
      this.customerService.getAll().subscribe(res => {
        this.customerList = res;
      } );
    }
    onUpdate(customer:any):void{
      this.isUpdate=true,
      this.selectedId=customer.id,

      this.customerForm.patchValue({
        firstName:customer.firstName,
        lastname:customer.lastName,
        dob:customer.dob,
        contactNo:customer.contactNo,
        address:customer.address
      });
    }

onDelete(id:string):void{
  let isConfirm : boolean=confirm('Are you want to delete this Record?');

  if(isConfirm){
    this.customerService.delete(id).subscribe(res =>{
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
