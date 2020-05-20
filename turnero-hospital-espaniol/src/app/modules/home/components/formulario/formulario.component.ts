import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as ContextoActions from '../../../../core/store/actions/contexto.actions';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as ContextSelectors from '../../../../core/store/selectors/contexto.selectors';
import * as FormSelectors from '../../../../core/store/selectors/form.selectors';
import { CentroAtencion, CodigoNombre, Especialidad, Formulario, Login, ObraSocial, Plan } from '../../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest } from '../../../../shared/models/request.models';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {

  @ViewChild('autoEspecComplete') autoEspecComplete;
  
  obrasSociales$: Observable<ObraSocial[]>;
  planes$: Observable<Plan[]>;
  especialidades$: Observable<Especialidad[]>;
  filteredEspecialidades$: Observable<Especialidad[]>;
  centrosDeAtencion$: Observable<CentroAtencion[]>;

  fechaNacimiento = new FormControl('', [Validators.required]);
  obrasSocial = new FormControl('', [Validators.required]);
  plan = new FormControl('', [Validators.required]);
  especialidad = new FormControl('', [Validators.required]);
  centroAtencion = new FormControl('', [Validators.required]);

  startDate: Date;
  maxDate: Date;

  constructor(
    private store: Store<{ formulario: Formulario }>
  ) {
    this.obrasSociales$ = store.select(FormSelectors.selectAllObrasSociales);
    this.planes$ = store.select(FormSelectors.selectPlanes);
    this.especialidades$ = store.select(FormSelectors.selectAllEspecialidades);
    this.centrosDeAtencion$ = store.select(FormSelectors.selectAllCentrosDeAtencion);
    this.maxDate = new Date();
    this.startDate = new Date(1980, 0, 1);
  }

  ngOnInit() {

    const login = new Login();
    login.username = environment.username;
    login.password = environment.password;

    this.store.select(ContextSelectors.getToken).pipe(
      filter(token => token === undefined)
    ).subscribe( () => {
      this.store.dispatch(ContextoActions.getToken( { login } ));
      this.store.select(ContextSelectors.getToken).pipe(
        filter(token => (token !== undefined))
      ).subscribe(
        () => {
          this.store.dispatch(FormActions.getObraSociales());
          this.store.dispatch(FormActions.getEspecialidades());
          this.store.dispatch(FormActions.getCentrosDeAtencion());
        }
      );
    });

    this.store.select(FormSelectors.selectDatosFormulario).subscribe(
      (datosFormulario) => {
        if (datosFormulario) {
          this.fechaNacimiento.setValue(datosFormulario.fechaNacimiento);
          this.obrasSocial.setValue(datosFormulario.obraSocial);
          this.plan.setValue(datosFormulario.plan);
          this.especialidad.setValue(datosFormulario.especialidad);
          this.centroAtencion.setValue(datosFormulario.centroAtencion);
        }
      }
    ).unsubscribe();

    this.filteredEspecialidades$ = this.especialidad.valueChanges.pipe(
      startWith<string | Especialidad>(''),
      map(value => typeof value === 'string' ? value : value.nombre),
      switchMap(x => this.filterEsp(x))
    );

    this.especialidad.valueChanges.subscribe( value => this.cambioEspecialidad(value));

  }

  filterEsp(value: String): Observable<Especialidad[]> {
    const filterValue = value.toLowerCase();
    return this.especialidades$.pipe(
      map(e => e.filter(el => el.nombre.toLowerCase().indexOf(filterValue) !== -1))
    );
  }

  displayFn(option?: CodigoNombre): string | undefined {
    return option ? option.nombre : undefined;
  }

  cambioFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setFechaNacimiento({ fechaNacimiento: event.value }));
  }

  cambioObraSocial(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setObraSocialSelected({ obraSocialSelected: event.value }));
    this.store.dispatch(FormActions.setPlanSelected({ planSelected: undefined }));
    this.plan.setValue(undefined);
  }

  clear() {
    this.especialidad.setValue('');
    setTimeout(()=> {this.autoEspecComplete.openPanel() })
  }

  cambioPlan(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setPlanSelected({ planSelected: event.value }));
  }

  cambioEspecialidad(value) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setEspecialidadSelected({ especialidadSelected: value }));
  }

  onEnterE2(evt: any, field: string){
    if (evt && evt.key === "Enter") {
      this.onEnterE(evt, field);
    }
  }

  onEnterE(evt: any, field: string){
    document.getElementsByName(field)[0].focus();
  }

  cambioCentroDeAtencion(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setCentroDeAtencionSelected({ centroDeAtencionSelected: event.value }));
  }

  isValid() {
    let result = false;
    if (
      this.fechaNacimiento.valid && this.obrasSocial.valid && this.plan.valid && this.plan.value != undefined
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
        // tslint:disable-next-line: no-shadowed-variable
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
