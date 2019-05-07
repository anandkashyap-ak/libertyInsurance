import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { diagnosisNameArray, insuredMemberArray, memberTypeArray, doctorNameArray } from '../mock-data/mock-data';
import { IDiagnosis, IDoctor, IInsuredMember, IMemberType } from '../models/model';
import {LibertyService} from '../liberty.service';
@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.css'],
  animations: [
    trigger('slideInOut', [
    transition(':enter', [style({ opacity: 0 }), animate('0.6s', style({ opacity: 1 }))]),
    // transition(':leave', [style({ opacity: 0 }), animate('0.6s', style({ opacity: 1 }))],)
    ])
    ]
})
export class SliderFormComponent implements OnInit {
  loading = false;
  insuredMemberArray: any[];
  memberTypeArray: any[];
  doctorNameArray: IDoctor[];
  diagnosisNameArray: IDiagnosis[];
  showScreen: number;
  doctorNameSearchArray;
  diagnosisNameSearchArray;
  claimResArray;

  selectedAnswers = [];
  screenArray: number[] = [1, 2];
  searchStr = '';
  dSearchStr = '';
  showPopup = false;
  showDiagPopup = false;
  docSelected = false;
  diagSelected = false;
  progressBarPercent = 0;
  currency = ''; price = '';

  constructor(
    private liberty: LibertyService,
    private router: Router
     ) {
  }

  ngOnInit() {
    if (this.liberty.getinsuredMembers() === null) {
      this.router.navigate(['']);
    }
    /* assign mock data */
    // this.insuredMemberArray = insuredMemberArray;
    // this.memberTypeArray = memberTypeArray;
    this.doctorNameArray = doctorNameArray;

    this.insuredMemberArray = this.liberty.getinsuredMembers();
    this.getClaimDetail();

    /* Set initial screen */
    this.showScreen = this.screenArray[0];

    /* Make copy for auto search */
    this.doctorNameSearchArray = JSON.parse(JSON.stringify(this.doctorNameArray));
  }

  getClaimDetail() {
    this.loading = true;
    this.liberty.getClaimDetails().subscribe(res => {
      this.loading = false;
      this.memberTypeArray = Object.assign([], res.result);
      this.claimResArray = Object.assign([], res.result);
    }, err => {
      console.log(err);
      this.loading = false;
    }, () => {
    });
  }

  calcProgressBarPercent() {
    /* Calculate progressbar percent */
    if (this.progressBarPercent >= 100) {
      return 100;
    }
    const divider = 100 / (this.screenArray.length - 1);
    this.progressBarPercent = Math.floor((this.showScreen - 1) * divider);
    return this.progressBarPercent;
  }

  makeSelected(item: any, screenIndex: number) {
    this.selectedAnswers[screenIndex - 1] = item;
    this.showScreen = this.screenArray[screenIndex];
  }

  makeClaimSelected(item: any, screenIndex: number, arrIndex: number) {
    // select diagnosis array
    this.diagnosisNameArray = Object.assign([], this.claimResArray[arrIndex].diognosisList);
    this.diagnosisNameSearchArray = JSON.parse(JSON.stringify(this.diagnosisNameArray));
    // this.makeSelected(item, screenIndex);
  }

  nextScreen() {
    this.showScreen += 1;
  }

  checkVal(price) {
    if (price.length > 0) {
      this.selectedAnswers[6] = price;
    } else {
      delete this.selectedAnswers[6];
    }
  }

}
