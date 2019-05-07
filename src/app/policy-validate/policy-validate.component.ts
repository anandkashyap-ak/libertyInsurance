import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import {LibertyService} from '../liberty.service';
import { IInsuredMember, IPolicyInput, PolicyInput } from '../models/models';

@Component({
  selector: 'app-policy-validate',
  templateUrl: './policy-validate.component.html',
  styleUrls: ['./policy-validate.component.css']
})
export class PolicyValidateComponent implements OnInit {
  loading = false;
  errText = '';
  policyForm = new FormGroup({
    policyNumber: new FormControl('', Validators.required),
    policyText: new FormControl('', Validators.required),
    certificateNumber: new FormControl('', Validators.required),
    certificateText: new FormControl('', Validators.required),
    passportNumber: new FormControl('', Validators.required),
  });
  policyFormValidationMessages = {
    policyNumber: 'Policy Number is a required field',
    certificateNumber: 'Certificate Number is a required field',
    passportNumber: 'Passport Number is a required field'
  };

  constructor(
    private liberty: LibertyService,
    private router: Router
    ) { }

  ngOnInit() {
    /* Delete Previous localStorage values if present */
    if (this.liberty.getPolicy()) {
      this.liberty.deleteStorageItem('policy');
    }
    if (this.liberty.getInsuredMembers()) {
      this.liberty.deleteStorageItem('insuredMembers');
    }
  }

  /* Method to mark all form fields as dirty */
  markFieldsAsDirty() {
    Object.keys(this.policyForm.controls).forEach(field => {
      const control = this.policyForm.get(field);
      control.markAsDirty({ onlySelf: true });
    });
  }

  /* Method called on Continue button click */
  onSubmit() {
    /* Mark all form fields as dirty and continue only if form is valid */
    this.markFieldsAsDirty();
    if (this.policyForm.valid) {
      const formJson = this.policyForm.value;
      formJson.policyNumber = formJson.policyNumber + '-' + formJson.policyText;
      formJson.certificateNumber = formJson.certificateNumber + '-' + formJson.certificateText;
      delete formJson.policyText;
      delete formJson.certificateText;
      const inputBody: IPolicyInput = new PolicyInput(formJson.policyNumber, formJson.certificateNumber, formJson.passportNumber);
      this.loading = true;
      /* Get policy from input form values by calling service method 'getPolicyDetails'*/
      this.liberty.getPolicyDetails(inputBody).subscribe(res => {
        this.loading = false;
        this.liberty.setInsuredMembers(res.policyDetail.members);
        this.router.navigate(['/subscribe']);
      }, err => {
        this.errText = err.error.message;
        this.loading = false;
        console.log(err);
      }, () => {
      });
    }
  }

}
