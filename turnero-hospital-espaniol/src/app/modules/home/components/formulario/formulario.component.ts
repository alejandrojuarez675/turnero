import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as FormSelectors from '../../../../core/store/selectors/form.selectors';
import { CentroAtencion, Especialidad, Formulario, ObraSocial, Plan } from '../../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest } from '../../../../shared/models/request.models';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  obrasSociales$: Observable<ObraSocial[]>;
  planes$: Observable<Plan[]>;
  especialidades$: Observable<Especialidad[]>;
  centrosDeAtencion$: Observable<CentroAtencion[]>;

  fechaNacimiento = new FormControl('', [Validators.required]);
  obrasSocial = new FormControl('', [Validators.required]);
  plan = new FormControl('', [Validators.required]);
  especialidad = new FormControl('', [Validators.required]);
  centroAtencion = new FormControl('', [Validators.required]);

  maxDate: Date;

  constructor(
    private store: Store<{ formulario: Formulario }>
  ) {
    this.obrasSociales$ = store.select(FormSelectors.selectAllObrasSociales);
    this.planes$ = store.select(FormSelectors.selectPlanes);
    this.especialidades$ = store.select(FormSelectors.selectAllEspecialidades);
    this.centrosDeAtencion$ = store.select(FormSelectors.selectAllCentrosDeAtencion);
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.store.dispatch(FormActions.getObraSociales());
    this.store.dispatch(FormActions.getEspecialidades());
    this.store.dispatch(FormActions.getCentrosDeAtencion());
  }

  cambioFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setFechaNacimiento({ fechaNacimiento: event.value }));
  }

  cambioObraSocial(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setObraSocialSelected({ obraSocialSelected: event.value }));
    this.store.dispatch(FormActions.setPlanSelected({ planSelected: undefined })); // FIXME
  }

  cambioPlan(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setPlanSelected({ planSelected: event.value }));
  }

  cambioEspecialidad(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setEspecialidadSelected({ especialidadSelected: event.value }));
  }

  cambioCentroDeAtencion(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setCentroDeAtencionSelected({ centroDeAtencionSelected: event.value }));
  }

  isValid() {
    let result = false;
    if (
      this.fechaNacimiento.valid && this.obrasSocial.valid && this.plan.valid
      && this.especialidad.valid && this.centroAtencion.valid
      ) {
      result = true;
    }
    return result;
  }

  onSubmit() {
    if (this.isValid()) {
      this.store.select(FormSelectors.selectBusquedaProfesionales)
      .subscribe(
        (filter: BusquedaProfesionalesRequest) => {
          this.store.dispatch(ContextoActions.setEstado({ newEstado: 2 })); // TODO: deberia cambiar con la vuelta
          this.store.dispatch(FormActions.getBusquedaProfesionales({filter}));
        }
      )
      .unsubscribe();
    }
  }

  cleanResultadoDisponibilidad() {
    this.store.dispatch(CalendarActions.setProfesionalesDisponibles({ profesionalesDisponibles: [] }));
    this.store.dispatch(ContextoActions.setEstado({ newEstado: 1 }));
  }
}
