import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ServiceService } from './services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
  ],
  providers: [
    ServiceService,
    AuthService,
  ]
})
export class CoreModule { }
