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

  showSearchList() {
    if (this.searchStr.length > 2) {
      this.showPopup = true;
    } else {
      this.showPopup = false;
    }
  }

  showDiagList() {
    this.docSelected = false;
    if (this.dSearchStr.length > 2) {
      this.showDiagPopup = true;
    } else {
      this.showDiagPopup = false;
    }
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

  removeSpecialChars(str: string) {
    return str.replace(/[^a-zA-Z ]/g, '').trim();
  }

  nextScreen() {
    this.showScreen += 1;
  }

  highlightSearch(name: string) {
    return name.replace(new RegExp(this.searchStr, 'ig'), '<strong>' + this.searchStr + '</strong>');
  }

  selectDoctor(dname: string) {
    this.searchStr = dname;
    this.showPopup = false;
    this.docSelected = true;
    this.selectedAnswers[3] = dname;
  }

  selectDiag(diagname: string) {
    this.dSearchStr = diagname;
    this.showDiagPopup = false;
    this.diagSelected = true;
    this.selectedAnswers[4] = diagname;
  }

  makeDiag(item: string, screenIndex: number) {
    this.dSearchStr = item;
    this.selectedAnswers[screenIndex - 1] = item;
  }

  prevDate(calender) {
    const CurrentDate: Date = new Date();
    CurrentDate.setDate(CurrentDate.getDate() - 1);
    calender.value = CurrentDate;
  }

  consultDate(calenderDate) {
    this.selectedAnswers[2] = calenderDate.value;
  }

  checkVal(price) {
    if (price.length > 0) {
      this.selectedAnswers[6] = price;
    } else {
      delete this.selectedAnswers[6];
    }
  }

  checkIfInvalid() {
    if (this.showScreen === 3 && !this.selectedAnswers[2]) {
      return true;
    } else if (this.showScreen === 4 && (this.selectedAnswers.length < 4 || !this.searchStr)) {
      return true;
    } else if (this.showScreen === 5 && (this.selectedAnswers.length < 5 || !this.dSearchStr)) {
      return true;
    } else if (this.showScreen === 6 && !this.selectedAnswers[5]) {
      return true;
    } else {
      return false;
    }
  }

}
