import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import * as FormSelectors from '../../../../core/store/selectors/form.selectors';
import { CentroAtencion, CodigoNombre, Especialidad, Formulario, Login, ObraSocial, Paciente, Plan, Profesional } from '../../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest, BusquedaRequest } from '../../../../shared/models/request.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})


export class FormularioComponent implements OnInit {

  @ViewChild('autoEspecComplete') autoEspecComplete;
  @ViewChild('autoProfComplete') autoProfComplete;
  @ViewChild('autoObraComplete') autoObraComplete;
  
  @ViewChild('footer') footerElement: ElementRef;
  show: boolean = false;
  
  pacienteSelected$: Observable<Paciente>;

  filteredObrasSociales$: Observable<ObraSocial[]>;
  obrasSociales$: Observable<ObraSocial[]>;
  planes$: Observable<Plan[]>;
  especialidades$: Observable<Especialidad[]>;
  filteredEspecialidades$: Observable<Especialidad[]>;
  profesionales$: Observable<Profesional[]>;
  filteredProfesionales$: Observable<Profesional[]>;
  centrosDeAtencion$: Observable<CentroAtencion[]>;
  
  fechaNacimiento = new FormControl('', [Validators.required]);
  obrasSocial = new FormControl('', [Validators.required]);
  plan = new FormControl('');
  especialidad = new FormControl('');
  profesional = new FormControl('');
  centroAtencion = new FormControl('', [Validators.required]);

  startDate: Date;
  maxDate: Date;

  constructor(
    private store: Store<{ formulario: Formulario }>,
    private router: Router,
  ) {
    this.pacienteSelected$ = store.select(ContextSelectors.getPacienteSelected);

    this.obrasSociales$ = store.select(FormSelectors.selectAllObrasSociales);
    this.planes$ = store.select(FormSelectors.selectPlanes);
    this.especialidades$ = store.select(FormSelectors.selectAllEspecialidades);
    this.profesionales$ = store.select(FormSelectors.selectAllProfesionales);
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
          this.profesional.setValue(datosFormulario.profesional);
          this.especialidad.setValue(datosFormulario.especialidad);
          this.centroAtencion.setValue(datosFormulario.centroAtencion);
        }
      }
    ).unsubscribe();

    this.fechaNacimiento.valueChanges.subscribe( value => {
      setTimeout(()=> {
        this.store.select(FormSelectors.selectBusqueda)
        .subscribe(
          (filterFecha: BusquedaRequest) => {
            this.store.dispatch(FormActions.postEspecialidades({filterFecha}));
            this.store.dispatch(FormActions.postProfesionales({filterFecha}));
          }
        ).unsubscribe();
      }
    )})

    this.filteredObrasSociales$ = this.obrasSocial.valueChanges.pipe(
      startWith<string | ObraSocial>(''),
      map(value => typeof value === 'string' ? value : value.nombre),
      switchMap(x => this.filterOs(x))
    );

    this.filteredEspecialidades$ = this.especialidad.valueChanges.pipe(
      startWith<string | Especialidad>(''),
      map(value => typeof value === 'string' ? value : value.nombre),
      switchMap(x => this.filterEsp(x))
    );

    this.filteredProfesionales$ = this.profesional.valueChanges.pipe(
      startWith<string | Profesional>(''),
      filter(value => value !== undefined),
      map(value => typeof value === 'string' ? value : value.nombreApellido),
      switchMap(x => this.filterProf(x))
    );

    this.obrasSocial.valueChanges.subscribe( value => this.cambioObraSocial(value));
    this.especialidad.valueChanges.subscribe( value => this.cambioEspecialidad(value));
    this.profesional.valueChanges.subscribe( value => this.cambioProfesional(value));

  }

  filterProf(value: String): Observable<Profesional[]> {
    const filterValue = value.toLowerCase();
    return this.profesionales$.pipe(
      map(e => 
          e.filter(el => 
            el.nombreApellido.toLowerCase().indexOf(filterValue) !== -1)
      ));
  }

  filterOs(value: String): Observable<ObraSocial[]> {
    const filterValue = value.toLowerCase();
    return this.obrasSociales$.pipe(
      map(os => os.filter(el => el.nombre.toLowerCase().indexOf(filterValue) !== -1))
    );
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

  displayFn2(option?: Profesional): string | undefined {
    return option ? option.nombreApellido : undefined;
  }

  cambioFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    this.cleanResultadoDisponibilidad();
    this.especialidad.setValue('');
    this.profesional.setValue('');
    this.store.dispatch(FormActions.setFechaNacimiento({ fechaNacimiento: event.value }));
  }

  cambioObraSocial(value) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setObraSocialSelected({ obraSocialSelected: value }));
    this.store.dispatch(FormActions.setPlanSelected({ planSelected: undefined }));
    this.plan.setValue(undefined);

    setTimeout(()=> {
      if (this.obrasSocial.value != undefined && 
          this.obrasSocial.value.plan != undefined && 
          this.obrasSocial.value.plan.length > 0) {
        this.plan = new FormControl('', Validators.required);
      } else {
        this.plan = new FormControl('');
      }
    })
  }

  clear() {
    this.especialidad.setValue('');
    setTimeout(()=> {this.autoEspecComplete.openPanel() })
  }
  clearOS() {
    this.obrasSocial.setValue('');
    setTimeout(()=> {this.autoObraComplete.openPanel() })
  }
  clearP() {
    this.profesional.setValue('');
    setTimeout(()=> {this.autoProfComplete.openPanel() })
  }

  cambioPlan(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setPlanSelected({ planSelected: event.value }));
  }

  cambioProfesional(value) {
    
    if (value == undefined) {
      setTimeout(()=> { })
      this.profesional.setValue('');
      setTimeout(()=> { })
    }
    
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setProfesionalSelected({ profesionalSelected: value }));
  }

  cambioEspecialidad(value) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setEspecialidadSelected({ especialidadSelected: value }));
    
    if (this.profesional != undefined && this.profesional.value != undefined &&
        this.profesional.value.especialidad != undefined) {
      if (value != undefined && value.codigo != undefined && 
          this.profesional.value.especialidad.filter(e => e.codigo === value.codigo).length <= 0) {
        this.profesional.setValue('');
      }
    }
  }

  onEnterE2(evt: any, field: string){
    if (evt && evt.key === "Enter") {
      this.onEnterE(evt, field);
    }
  }

  onEnterE(evt: any, field: string){
    setTimeout(()=> {
      document.getElementsByName(field)[0].focus();
    })
  }

  cambioCentroDeAtencion(event) {
    this.cleanResultadoDisponibilidad();
    this.store.dispatch(FormActions.setCentroDeAtencionSelected({ centroDeAtencionSelected: event.value }));
  }
  
  isValid() {
    let result = false;
    if (
      this.fechaNacimiento.valid 
      && this.obrasSocial.valid
      && ((this.plan.value != undefined && this.plan.value != '' ) || 
        (this.obrasSocial.value.plan == undefined || this.obrasSocial.value.plan.length == 0))
      && ((this.especialidad.value != undefined && this.especialidad.value != '') || 
      (this.profesional.value != undefined && this.profesional.value != ''))
      && this.centroAtencion.valid
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
          this.store.dispatch(FormActions.getBusquedaProfesionales({filter}));
          
          if (window.innerWidth <= 1000) {
            var wh = window.innerHeight;
            setTimeout(()=> {
              this.show = false;  
              this.show = true; 
              setTimeout(()=> {
                this.store.select(CalendarSelectors.getProfesionalesDisponiblesLength).subscribe(
                  (len) => {
                    if (len > 0) {
                      this.footerElement.nativeElement.scrollIntoView();
                      this.show = false; 
                    }
                  }
                ).unsubscribe(); 
              },1000);
            },0);
          }
        }
      )
      .unsubscribe();
    }
  }

  cleanResultadoDisponibilidad() {
    this.store.dispatch(CalendarActions.setProfesionalesDisponibles({ profesionalesDisponibles: [] }));
    this.store.dispatch(CalendarActions.setDiasDisponibles({ diasDisponibles: [] }));
    this.store.dispatch(CalendarActions.setHorariosDisponibles({ horarios: [] }));
  }
}

