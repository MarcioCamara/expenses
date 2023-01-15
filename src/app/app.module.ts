import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import { DeleteOutline, EditOutline, EyeOutline, SaveOutline } from '@ant-design/icons-angular/icons';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ExpensesComponent } from './pages/register/itens/expenses/expenses.component';
import { RevenuesComponent } from './pages/register/itens/revenues/revenues.component';
import { StatusesComponent } from './pages/register/parameters/statuses/statuses.component';
import { RevenuesComponent as ParameterRevenuesComponent } from './pages/register/parameters/revenues/revenues.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

registerLocaleData(pt);

const icons: IconDefinition[] = [
  DeleteOutline,
  EditOutline,
  EyeOutline,
  SaveOutline,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpensesComponent,
    RevenuesComponent,
    StatusesComponent,
    ParameterRevenuesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzDividerModule,
    NzEmptyModule,
    NzFormModule,
    NzIconModule.forRoot(icons),
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    NzSelectModule,
    NzSpaceModule,
    NzTableModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    provideNgxMask(),
    {
      provide: NZ_I18N, useValue: pt_BR
    },
    {
      provide: LOCALE_ID, useValue: 'pt'
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
