import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import * as ReservacionActions from '../../../../core/store/actions/reservacion.actions';
import * as ContextSelectors from '../../../../core/store/selectors/contexto.selectors';
import { Contexto, Credencial, Login, Paciente, Turno, TurnoPaciente } from '../../../../shared/models/datos.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  @ViewChild('footer') footerElement: ElementRef;
  
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  
  nickname$: Observable<string>;
  pacienteSelected$: Observable<Paciente>;

  esAnonimo$: Observable<boolean>;
  pacientes$: Observable<Paciente[]>;
  displayedColumns = ['acciones','nombre','documento', 'fecha'];
  
  turnosFuturos$: Observable<TurnoPaciente[]>;
  displayedColumnsT = ['acciones','fecha', 'especialidad', 'profesional'];

  constructor(
    private store: Store<{ contexto: Contexto }>,
    private router: Router
  ) {
    this.pacientes$ = store.select(ContextSelectors.getPacientes);
    this.nickname$ = store.select(ContextSelectors.getNickname);
    this.pacienteSelected$ = store.select(ContextSelectors.getPacienteSelected);
    this.turnosFuturos$ = store.select(ContextSelectors.getTurnosFuturos);
  }

  ngOnInit() {
    this.esAnonimo$ = this.store.select(ContextSelectors.getEsAnonimo);

  }

  logout() {
    this.store.dispatch(ContextoActions.setToken({ token: undefined }));
    //this.store.dispatch(FormActions.cleanStore());
    this.store.dispatch(ContextoActions.cleanStore());
    this.store.dispatch(CalendarActions.cleanStore());
    this.store.dispatch(ReservaActions.cleanStore());
    this.store.dispatch(ReservacionActions.cleanStore());
    
  }

  logoutAndRedirect() {
    this.logout();
    this.router.navigate(['/home']);
  }

  redirectToTurnos() {
    this.router.navigate(['/home/dashboard']);
  }

  onSubmit() {
    const credencialUsuario = new Credencial();
    credencialUsuario.idUsuario = this.username.value;
    credencialUsuario.passUsurio = this.password.value;
    this.store.dispatch(ContextoActions.setCredencialUsuario({ credencialUsuario: credencialUsuario }));

    this.store.dispatch(ContextoActions.getUsuario({ credencialUsuario })); // TODO:
  }
  
  seleccionar(paciente: Paciente) {
    this.store.dispatch(ContextoActions.setPacienteSelected( { paciente: paciente } ));

    this.store.dispatch(ContextoActions.setPacienteSelected( { paciente: paciente } ));

    this.store.dispatch(FormActions.setFechaNacimiento( { fechaNacimiento: paciente.fechaNacimiento} ));
  }
}
