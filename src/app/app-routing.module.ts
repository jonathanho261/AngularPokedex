import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component'
import { DisplayScreenComponent } from './display-screen/display-screen.component'

const routes: Routes = [
  { path: '', redirectTo: '/home-screen', pathMatch: 'full' },
  { path: 'home-screen', component: HomeScreenComponent },
  { path: 'pokemon/:name', component: DisplayScreenComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
