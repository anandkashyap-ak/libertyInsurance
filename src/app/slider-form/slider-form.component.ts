import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

import { IInsuredMember, Claim } from '../models/models';
import { LibertyService } from '../liberty.service';

@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.css'],
  animations: [
    trigger('slideInOut', [
        transition(':enter', [
          style({ opacity: 0 }), animate('0.6s', style({ opacity: 1 }))
        ]),
      ])
    ]
})
export class SliderFormComponent implements OnInit {
  insuredMemberArray: IInsuredMember[];
  memberTypeArray: Claim[];
  showScreen: number;

  selectedAnswers = [];
  screenArray: number[] = [1, 2];
  progressBarPercent = 0;
  loading = false;

  constructor(
    private liberty: LibertyService,
    private router: Router
     ) {
  }

  ngOnInit() {
    /* Navigate to home if localStorage tem not present */
    if (this.liberty.getInsuredMembers() === null) {
      this.router.navigate(['']);
    }

    this.insuredMemberArray = this.liberty.getInsuredMembers();
    this.getClaimDetail();

    /* Set initial screen */
    this.showScreen = this.screenArray[0];

  }

  /* Call service method getClaimDetails */
  getClaimDetail() {
    this.loading = true;
    this.liberty.getClaimDetails().subscribe(res => {
      this.loading = false;
      this.memberTypeArray = Object.assign([], res.result);
    }, err => {
      console.log(err);
      this.loading = false;
    }, () => {
    });
  }

  /* Calculate progressbar percent */
  calcProgressBarPercent() {
    if (this.progressBarPercent >= 100) {
      return 100;
    }
    const divider = 100 / (this.screenArray.length);
    this.progressBarPercent = Math.floor((this.showScreen - 1) * divider);
    return this.progressBarPercent;
  }

  /* Make the current screen selected */
  makeSelected(item: any, screenIndex: number) {
    this.selectedAnswers[screenIndex - 1] = item;
    this.showScreen = this.screenArray[screenIndex];
  }

}
