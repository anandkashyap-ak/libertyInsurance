import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibertyService {
  private baseUrl = 'http://34.73.3.99:8080/1.0';

  constructor(
    private httpClient: HttpClient
  ) { }

  deleteStorageItem(keyname: string) {
    localStorage.removeItem(keyname);
  }

  setPolicy(policyInput) {
    localStorage.setItem('policy', JSON.stringify(policyInput));
  }

  getPolicy() {
    return JSON.parse(localStorage.getItem('policy'));
  }

  getinsuredMembers() {
    return JSON.parse(localStorage.getItem('insuredMembers'));
  }

  setinsuredMembers(insuredMembers) {
    localStorage.setItem('insuredMembers', JSON.stringify(insuredMembers));
  }

  getPolicyDetails(policy, second = false) {
    const dashboardUrl = this.baseUrl + '/dashboard';
    const headers = new HttpHeaders();
    const body = {
      wsVer: '1.0',
      policyNumber: policy.policyNumber,
      certNo: policy.certificateNumber,
      language: 'ENG',
      identityNumber: policy.passportNumber,
      dob: '1988-01-01'
    };
    if (second) {
      body.wsVer = '2.0';
    }
    this.setPolicy(body);
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(dashboardUrl, body, {headers: headers});
  }

  getClaimDetails() {
    const dashboardUrl = this.baseUrl + '/claimdetail';
    const headers = new HttpHeaders();
    const body = this.getPolicy();
    delete body.wsVer;
    body.wsVersion = '1.0';
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<any>(dashboardUrl, body, {headers: headers});
  }

}

