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
import { ObraSocial, Paciente, Plan, ReservaFormulario, ReservaRespuesta, Turno } from '../../../../shared/models/datos.models';
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
  telefono = new FormControl('', [Validators.required,
    Validators.minLength(5),
    Validators.pattern(/^\d+$/)]);
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
    paciente.telefono = this.telefono.value;
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
      this.telefono.valid && this.mail.valid
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
