import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ReservaAction from '../../../../core/store/actions/reserva.actions';
import * as ContextoSelectors from '../../../../core/store/selectors/contexto.selectors';
import * as ReservaSelector from '../../../../core/store/selectors/reserva.selectors';
import * as FormularioSelectors from '../../../../core/store/selectors/form.selectors';
import { Paciente, ReservaFormulario, Turno, ReservaRespuesta, ObraSocial, Plan } from '../../../../shared/models/datos.models';
import { ReservaTurnoRequest } from '../../../../shared/models/request.models';
import { filter } from 'rxjs/operators';

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
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
  
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
  
  constructor(
    private store: Store<{ reservaTurno: ReservaFormulario }>
  ) {
    this.estado$ = store.select(ContextoSelectors.getEstado);
    this.turnoSelected$ = store.select(ReservaSelector.getTurnoSelected);
    this.obraSocialSelected$ = store.select(FormularioSelectors.selectObraSocialSelected);
    this.planSelected$ = store.select(FormularioSelectors.selectPlanSelected);
    this.fechaNacimientoSelected$ = store.select(FormularioSelectors.selectFechaNacimiento);
  }


  ngOnInit() {
    this.clearFormulario();
  }

  reservar() {
    this.turnoSelected$.subscribe(turno => this.turnoSelected = turno);
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

    this.store.dispatch(ReservaAction.setPaciente({ paciente }));

    this.onSubmit();
  }

  onSubmit() {
    if (this.isValid) {
      this.store.select(ReservaSelector.reservarTurno)
      .subscribe(
        (filter: ReservaTurnoRequest) => {
          if (filter) {
            this.store.dispatch(ReservaAction.reservaTurno({ filter }));
            this.clearFormulario();
          }
        }      
      )
      .unsubscribe();
    };
  }

  clearFormulario() {
    this.dni.setValue(undefined);
    this.sexo.setValue(undefined);
    this.nombreApellido.setValue(undefined);
    this.telefono.setValue(undefined);
    this.mail.setValue(undefined);
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

}
