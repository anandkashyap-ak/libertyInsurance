import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyValdateComponent } from './policy-valdate/policy-valdate.component';
import { SliderFormComponent } from './slider-form/slider-form.component';

const routes: Routes = [
  {path: '', component: PolicyValdateComponent},
  {path: 'subscribe', component: SliderFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
