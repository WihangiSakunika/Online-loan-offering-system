import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerService } from '../../services';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean>;
  isDisabled = true;

  customerForm !: FormGroup;
  CustomerList: any[] = [];
  isUpdate: boolean = false;
  selectedId: string;

  constructor(private fb: FormBuilder, private toastr: ToastrService, public customerservice: CustomerService) { }

  ngOnInit(): void {
    this.loading$ = this.loading.asObservable();
    this.initForm();
    this.getList();
  }
  initForm(): void {
    this.customerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      dob: ['', [Validators.required , this.minimumAgeValidator(18)]],
      loanBalance: ['', [Validators.required,Validators.max(15000)]],
      usedAmount: ['', [Validators.required  , Validators.max(15000)]],
      installmentPlan: ['', [Validators.required , Validators.max(3)]],
      email: ['', [Validators.required]]
    });
  }
  onSaveOrUpdate(): void {
    if (this.customerForm.invalid) {
      alert('Please fill required fields');
      return;
    }
    this.loading.next(true);

    if (this.isUpdate) {
      //Update Record
      this.customerservice.update(this.customerForm.value, this.selectedId).subscribe(res => {
        this.getList();
        this.loading.next(false);
        alert('Record has been updated.');

      });

    } else {
      //Save Record
      this.customerservice.create(this.customerForm.value).subscribe(res => {
        this.customerForm.reset();
        this.getList();
        this.loading.next(false);
      }, error => {
        alert('Error occured when saving data.\n' + error);
      }, () => {
        console.log('completed');
      })
    }
  }
  getList(): void {
    this.customerservice.getAll().subscribe(res => {
      this.CustomerList = res;
    });
  }
  onUpdate(customer: any): void {
    this.isUpdate = true,
      this.selectedId = customer.id,

      this.customerForm.patchValue({
        fullName: customer.fullName,
        dob:customer.dob,
        loanBalance:customer.loanBalance,
        usedAmount:customer.usedAmount,
        installmentPlan:customer.installmentPlan,
        email:customer.email
      });
  }

  onDelete(id: string): void {
    let isConfirm: boolean = confirm('Are you want to delete this Record?');

    if (isConfirm) {
      this.customerservice.delete(id).subscribe(res => {
        console.log(res);
        this.getList();
      })
    }
  }
  onReset(): void {
    this.isUpdate = false;
    this.selectedId = '';
  }
  disableInputField() {
    this.isDisabled = true;
  }
  minimumAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const birthDate = new Date(control.value);
      const ageInMs = Date.now() - birthDate.getTime();
      const ageInYears = ageInMs / (1000 * 3600 * 24 * 365);
      return ageInYears >= minAge ? null : { 'minimumAge': { value: control.value } };
    };
}}
