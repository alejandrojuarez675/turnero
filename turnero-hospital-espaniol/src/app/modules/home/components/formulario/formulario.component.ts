import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as FormSelectors from '../../../../core/store/selectors/form.selectors';
import { CentroAtencion, Especialidad, Formulario, ObraSocial } from '../../../../shared/models/datos.models';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  obrasSociales$: Observable<ObraSocial[]>;
  especialidades$: Observable<Especialidad[]>;
  centrosDeAtencion$: Observable<CentroAtencion[]>;

  fechaNacimiento = new FormControl('', [Validators.required]);
  obrasSocial = new FormControl('', [Validators.required]);
  plan = new FormControl('', [Validators.required]);
  especialidad = new FormControl('', [Validators.required]);
  centroAtencion = new FormControl('', [Validators.required]);

  constructor(
    private store: Store<{ formulario: Formulario }>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.obrasSociales$ = store.select(FormSelectors.selectAllObrasSociales);
    this.especialidades$ = store.select(FormSelectors.selectAllEspecialidades);
    this.centrosDeAtencion$ = store.select(FormSelectors.selectAllCentrosDeAtencion);
  }

  ngOnInit() {
    this.store.dispatch(FormActions.getObraSociales());
    this.store.dispatch(FormActions.getEspecialidades());
    this.store.dispatch(FormActions.getCentrosDeAtencion());

    this.route.queryParams.subscribe(
      (params) => this.setValuesFromParams(params)
    ).unsubscribe();
  }

  setValuesFromParams(params: Params): void {
    if (params.fechaNacimiento) {
      this.fechaNacimiento.setValue(new Date(params.fechaNacimiento));
    }

    if (params.codigoObraSocial) {
      this.obrasSociales$.pipe(
        map(x => x.filter(y => y.codigo.toString() === params.codigoObraSocial))
      ).subscribe(
        (os) => {
          if (os.length > 0) {
            const obrasSocialSelected = os[0];
            this.obrasSocial.setValue(obrasSocialSelected);

            if (params.codigoPlan) {
              const planSelected = obrasSocialSelected.plan
                .filter(x => x.codigo.toString() === params.codigoPlan);

              if (planSelected.length > 0) {
                this.plan.setValue(planSelected[0]);
              }
            }
          }
        }
      );
    }

    if (params.codigoEspecialidad) {
      this.especialidades$.pipe(
        map(x => x.filter(y => y.codigo.toString() === params.codigoEspecialidad))
      ).subscribe(
        (x) => { if (x.length > 0) { this.especialidad.setValue(x[0]); } }
      );
    }

    if (params.codigoCentroAtencion) {
      this.centrosDeAtencion$.pipe(
        map(x => x.filter(y => y.codigo.toString() === params.codigoCentroAtencion))
      ).subscribe(
        (x) => { if (x.length > 0) { this.centroAtencion.setValue(x[0]); } }
      );
    }
  }

  cambioFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    this.router.navigate([], {
      relativeTo: this.route, queryParams: { fechaNacimiento: event.value },
      queryParamsHandling: 'merge',
    });
  }

  cambioObraSocial(event) {
    this.router.navigate([], {
      relativeTo: this.route, queryParams: { codigoObraSocial: event.value.codigo },
      queryParamsHandling: 'merge',
    });
  }

  cambioPlan(event) {
    this.router.navigate([], {
      relativeTo: this.route, queryParams: { codigoPlan: event.value.codigo },
      queryParamsHandling: 'merge',
    });
  }

  cambioEspecialidad(event) {
    this.router.navigate([], {
      relativeTo: this.route, queryParams: { codigoEspecialidad: event.value.codigo },
      queryParamsHandling: 'merge',
    });
  }

  cambioCentroDeAtencion(event) {
    this.router.navigate([], {
      relativeTo: this.route, queryParams: { codigoCentroAtencion: event.value.codigo },
      queryParamsHandling: 'merge',
    });
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        lastClick: 'busquedaProfesionales'
      },
      queryParamsHandling: 'merge',
    });
  }
}
