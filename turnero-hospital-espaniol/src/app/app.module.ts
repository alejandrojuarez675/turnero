import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CalendarEffects } from '../app/core/store/effects/calendar.effects';
import { environment } from '../environments/environment';
import { FormEffects } from './../app/core/store/effects/form.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { calendarReducer } from './core/store/reducers/calendar.reducers';
import { contextoReducer } from './core/store/reducers/contexto.reducers';
import { formReducer } from './core/store/reducers/form.reducers';
import { SharedModule } from './shared/shared.module';
import { errorReducer } from './core/store/reducers/error.reducers';
import { ErrorEffects } from './core/store/effects/error.effects';
import { ReservaEffects } from './core/store/effects/reserva.effects';
import { reservaReducer } from './core/store/reducers/reserva.reducers';
import { reservacionReducer } from './core/store/reducers/reservacion.reducers';
import { ConfirmationReservaComponent } from './modules/home/components/confirmation-reserva/confirmation-reserva.component';
import { MatProgressSpinnerModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatRadioModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule, MatButtonToggleModule, MatTooltipModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { HttpErrorInterceptor } from './core/interceptor/error.interceptor';
import { ContextEffects } from './core/store/effects/context.effects';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR'
import { CustomDateAdapter, MY_DATE_FORMATS } from './shared/adapters/common';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './modules/home/pages/login-page/login-page.component';
import { MaterialModule } from './modules/home/material.module';
registerLocaleData(localeEs);

@NgModule({ 
  declarations: [
    AppComponent,
    ConfirmationReservaComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    SharedModule,
    StoreModule.forRoot({
      // router: routerReducer,
      contexto: contextoReducer,
      formulario: formReducer,
      calendario: calendarReducer,
      reserva: reservaReducer,
      reservacion: reservacionReducer,
      error: errorReducer,
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      FormEffects,
      CalendarEffects,
      ErrorEffects,
      ReservaEffects,
      ContextEffects,
    ]),
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CoreModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
