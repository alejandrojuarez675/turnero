import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as ReservaAction from '../../../../core/store/actions/reserva.actions';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import * as ErrorSelector from '../../../../core/store/selectors/error.selectors';
import * as FormSelectors from '../../../../core/store/selectors/form.selectors';
import * as FormularioSelectors from '../../../../core/store/selectors/form.selectors';
import * as ReservaSelector from '../../../../core/store/selectors/reserva.selectors';
import * as ReservacionSelectors from '../../../../core/store/selectors/reservacion.selectors';
import { ObraSocial, Paciente, Plan, ReservaFormulario, ReservaRespuesta, Telefono, Turno } from '../../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest, ReservaTurnoRequest, BusquedaHorariosRequest } from '../../../../shared/models/request.models';

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
    Validators.pattern(/^\d+$/)]);
  telefonoNumero = new FormControl('', [Validators.required,
      Validators.minLength(6),
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
  horariosLength$: Observable<number>;
  horariosLength: Number;

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

    this.horariosLength$ = this.store.select(CalendarSelectors.getHorariosDisponiblesLength);
    this.horariosLength$.subscribe(horariosLength => this.horariosLength = horariosLength).unsubscribe();

    console.log(this.horariosLength);
    if (this.horariosLength === 0){
      this.store.dispatch(CalendarActions.setProfesionalesDisponibles({ profesionalesDisponibles: [] }))
      this.store.select(FormSelectors.selectBusquedaProfesionales)
      .subscribe(
        (filter: BusquedaProfesionalesRequest) => {
          this.store.dispatch(ContextoActions.setEstado({ newEstado: 2 })); // TODO: deberia cambiar con la vuelta
          this.store.dispatch(FormActions.getBusquedaProfesionales({filter}));
        }
      )
      .unsubscribe();
    } else {

      this.store.dispatch(CalendarActions.setHorariosDisponibles({ horarios: [] }));
      this.store.select(CalendarSelectors.getBusquedaHorariosRequest).subscribe(
        (filtro: BusquedaHorariosRequest) =>
          this.store.dispatch(CalendarActions.getHorariosDisponibles({ filter: filtro }))
      ).unsubscribe();
    }

    this.router.navigate(['/home']);
  }

  onEnterE2(evt: any, field: string){
    if (evt && evt.key === "Enter") {
      this.onEnterE(evt, field);
    }
  }

  onEnterE(evt: any, field: string){
    document.getElementsByName(field)[0].focus();
  }
}
