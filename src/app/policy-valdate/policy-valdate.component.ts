import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';

import {LibertyService} from '../liberty.service';

@Component({
  selector: 'app-policy-valdate',
  templateUrl: './policy-valdate.component.html',
  styleUrls: ['./policy-valdate.component.css']
})
export class PolicyValdateComponent implements OnInit {
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
  }

  isFormValid() {
    Object.keys(this.policyForm.controls).forEach(field => {
      const control = this.policyForm.get(field);
      control.markAsDirty({ onlySelf: true });
    });
  }

  onSubmit() {
    this.isFormValid();
    if (this.policyForm.valid) {
      const formJson = this.policyForm.value;
      formJson.policyNumber = formJson.policyNumber + '-' + formJson.policyText;
      formJson.certificateNumber = formJson.certificateNumber + '-' + formJson.certificateText;
      delete formJson.policyText;
      delete formJson.certificateText;
      this.loading = true;
      this.liberty.getPolicyDetails(this.policyForm.value).subscribe(res => {
        this.liberty.getPolicyDetails(this.policyForm.value, true).subscribe(resp => {
          res = res.policyDetail.members.concat(resp.policyDetail.members);
          this.loading = false;
          this.liberty.setinsuredMembers(res);
          this.router.navigate(['/subscribe']);
        });
      }, err => {
        this.errText = err.error.message;
        this.loading = false;
        console.log(err);
      }, () => {
      });
    }
  }

}
