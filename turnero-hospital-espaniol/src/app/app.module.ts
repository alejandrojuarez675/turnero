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
import { MatProgressSpinnerModule, MAT_DATE_LOCALE } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    ]),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    
  ],
  exports: [
    CoreModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
