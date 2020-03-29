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
import { formReducer } from './core/store/reducers/form.reducers';
import { SharedModule } from './shared/shared.module';
import { errorReducer } from './core/store/reducers/error.reducers';
import { ErrorEffects } from './core/store/effects/error.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({
      // router: routerReducer,
      formulario: formReducer,
      calendario: calendarReducer,
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
    ]),
    BrowserAnimationsModule,
  ],
  exports: [
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
