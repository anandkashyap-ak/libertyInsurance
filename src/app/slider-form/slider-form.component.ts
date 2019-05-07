import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

import { IInsuredMember } from '../models/models';
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
  memberTypeArray: any[];
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
    if (this.liberty.getInsuredMembers() === null) {
      this.router.navigate(['']);
    }

    this.insuredMemberArray = this.liberty.getInsuredMembers();
    this.getClaimDetail();

    /* Set initial screen */
    this.showScreen = this.screenArray[0];

  }

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

  calcProgressBarPercent() {
    /* Calculate progressbar percent */
    if (this.progressBarPercent >= 100) {
      return 100;
    }
    const divider = 100 / (this.screenArray.length);
    this.progressBarPercent = Math.floor((this.showScreen - 1) * divider);
    return this.progressBarPercent;
  }

  makeSelected(item: any, screenIndex: number) {
    this.selectedAnswers[screenIndex - 1] = item;
    this.showScreen = this.screenArray[screenIndex];
  }

  nextScreen() {
    this.showScreen += 1;
  }

}
