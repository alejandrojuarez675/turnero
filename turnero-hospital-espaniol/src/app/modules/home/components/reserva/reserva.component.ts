import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ReservaAction from '../../../../core/store/actions/reserva.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as FormularioSelectors from '../../../../core/store/selectors/form.selectors';
import * as ReservacionSelectors from '../../../../core/store/selectors/reservacion.selectors';
import * as ReservaSelector from '../../../../core/store/selectors/reserva.selectors';
import * as ErrorSelector from '../../../../core/store/selectors/error.selectors';
import { ObraSocial, Paciente, Plan, ReservaFormulario, ReservaRespuesta, Turno, Telefono } from '../../../../shared/models/datos.models';
import { ReservaTurnoRequest } from '../../../../shared/models/request.models';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import { filter } from 'rxjs/operators';
import { Errors } from '../../../../core/store/reducers/error.reducers';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  dni = new FormControl('', [Validators.required,
    Validators.minLength(6),
    Validators.maxLength(10),
    Validators.pattern(/^\d+$/)]);
  sexo = new FormControl('', [Validators.required]);
  nombreApellido = new FormControl('', [Validators.required]);
  telefonoArea = new FormControl('', [Validators.required,
    Validators.minLength(2),
    Validators.maxLength(4),
    Validators.pattern('^[1-9][0-9]*')]);
  telefonoNumero = new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(8),
      Validators.pattern('^(15){0}[0-9]*')]);    
  mail = new FormControl('', [Validators.required,
    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]);

  estado$: Observable<number>;
  sexo$: string[] = ['Femenino', 'Masculino'];
  turnoSelected$: Observable<Turno>;
  turnoSelected: Turno;
  obraSocialSelected$: Observable<ObraSocial>;
  obraSocialSelected: ObraSocial;
  planSelected$: Observable<Plan>;
  planSelected: Plan;
  fechaNacimientoSelected$: Observable<Date>;
  fechaNacimientoSelected: Date;
  reservaSelected$: Observable<ReservaRespuesta>;
  errorBackend$: Observable<number>;
  loading = false;

  constructor(
    private store: Store<{ reservaTurno: ReservaFormulario }>,
    private router: Router
  ) {
    this.estado$ = store.select(ContextoSelectors.getEstado);
    this.turnoSelected$ = store.select(ReservaSelector.getTurnoSelected);
    this.obraSocialSelected$ = store.select(FormularioSelectors.selectObraSocialSelected);
    this.planSelected$ = store.select(FormularioSelectors.selectPlanSelected);
    this.fechaNacimientoSelected$ = store.select(FormularioSelectors.selectFechaNacimiento);
    this.errorBackend$ = store.select(ErrorSelector.getCountError);
  }


  ngOnInit() {
    this.turnoSelected$.subscribe(
      (turno) => {
        this.turnoSelected = turno;
        if (!turno) { this.router.navigate(['/home']); }
      }
    );

    this.errorBackend$.subscribe(() => {
      this.loading = false;
    });
  }

  reservar() {
    this.obraSocialSelected$.subscribe(obraSocial => this.obraSocialSelected = obraSocial);
    this.planSelected$.subscribe(plan => this.planSelected = plan);
    this.fechaNacimientoSelected$.subscribe(fechaNacimiento => this.fechaNacimientoSelected = fechaNacimiento);

    const paciente = new Paciente();
    paciente.dni = this.dni.value;
    paciente.sexo = this.sexo.value === 'Femenino' ? 'F' : 'M';
    paciente.nombreApellido = this.nombreApellido.value;
    const telefono = new Telefono();
    telefono.area = this.telefonoArea.value;
    telefono.numero = this.telefonoNumero.value;
    paciente.telefono = telefono;
    paciente.email = this.mail.value;

    paciente.codigoObraSocial = this.obraSocialSelected.codigo;
    paciente.codigoPlan = this.planSelected.codigo;
    paciente.fechaNacimiento = this.fechaNacimientoSelected;

    paciente.codigoProfesional = this.turnoSelected.profesional.codigo;
    paciente.codigoEspecialidad = this.turnoSelected.profesional.especialidad.codigo;

    this.store.dispatch(ReservaAction.setPaciente({ paciente }));

    this.onSubmit();
  }

  onSubmit() {
    if (this.isValid) {
      this.loading = true;
      this.store.select(ReservaSelector.reservarTurno)
      .subscribe(
        (filter: ReservaTurnoRequest) => {
          if (filter) {
            this.store.dispatch(ReservaAction.reservaTurno({ filter }));
          }
        }
      )
      .unsubscribe();

      this.store.select(ReservacionSelectors.getReserva).pipe(
        filter(reserva => reserva != undefined && reserva.codigo != undefined)
      ).subscribe(() => {
        this.loading = false;
      });
  
    }
  }

  isValid() {
    let result = false;
    if (
      this.dni.valid && this.sexo.valid && this.nombreApellido.valid &&
      this.telefonoArea.valid && this.telefonoNumero.valid && this.mail.valid
    ) {
      result = true;
    }
    return result;
  }

  volverASeleccionDeTurno() {
    this.store.dispatch(CalendarActions.setTurnoSelected({ turnoSelected: undefined }));
    this.store.dispatch(ReservaAction.setTurnoSelected({ turnoSelected: undefined }));
    this.router.navigate(['/home']);
  }

}
