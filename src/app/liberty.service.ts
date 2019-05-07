import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { IPolicyInput, PolicyInput, Policy, ClaimDetail } from './models/models';

@Injectable({
  providedIn: 'root'
})
export class LibertyService {
  private baseUrl = 'http://34.73.3.99:8080/1.0';

  constructor(
    private httpClient: HttpClient
  ) { }

  getPolicyDetails(policy: IPolicyInput) {
    const dashboardUrl = this.baseUrl + '/dashboard';
    const headers = new HttpHeaders();
    const body = new PolicyInput(policy.policyNumber, policy.certNo, policy.identityNumber);
    this.setPolicy(body);
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<Policy>(dashboardUrl, body, {headers: headers});
  }

  getClaimDetails() {
    const dashboardUrl = this.baseUrl + '/claimdetail';
    const headers = new HttpHeaders();
    const body = this.getPolicy();
    body.wsVersion = '1.0';
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<ClaimDetail>(dashboardUrl, body, {headers: headers});
  }

  deleteStorageItem(keyname: string) {
    localStorage.removeItem(keyname);
  }

  setPolicy(policyInput) {
    localStorage.setItem('policy', JSON.stringify(policyInput));
  }

  getPolicy() {
    return JSON.parse(localStorage.getItem('policy'));
  }

  getInsuredMembers() {
    return JSON.parse(localStorage.getItem('insuredMembers'));
  }

  setInsuredMembers(insuredMembers) {
    localStorage.setItem('insuredMembers', JSON.stringify(insuredMembers));
  }

}

