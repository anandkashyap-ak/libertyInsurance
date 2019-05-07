import { Component } from '@angular/core';
import { fadeAnimation } from './animations';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css'],
animations: [fadeAnimation] // register the animation
})
export class AppComponent {
title = 'libertyInsurance';
}
