import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExpensesComponent } from './pages/register/itens/expenses/expenses.component';
import { RevenuesComponent } from './pages/register/itens/revenues/revenues.component';
import { RevenuesComponent as ParameterRevenuesComponent } from './pages/register/parameters/revenues/revenues.component';
import { StatusesComponent } from './pages/register/parameters/statuses/statuses.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register/itens/expenses',
    component: ExpensesComponent,
  },
  {
    path: 'register/itens/revenues',
    component: RevenuesComponent,
  },
  {
    path: 'register/parameters/statuses',
    component: StatusesComponent,
  },
  {
    path: 'register/parameters/revenues',
    component: ParameterRevenuesComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
