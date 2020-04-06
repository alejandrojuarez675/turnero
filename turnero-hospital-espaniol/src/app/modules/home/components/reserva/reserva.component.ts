import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ReservaAction from '../../../../core/store/actions/reserva.actions';
import * as ReservaSelector from '../../../../core/store/selectors/reserva.selectors';
import * as CalendarSelectors from '../../../../core/store/selectors/caledar.selectors';
import { Paciente, ReservaFormulario, Turno, ReservaRespuesta } from '../../../../shared/models/datos.models';
import { ReservaTurnoRequest } from '../../../../shared/models/request.models';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  sexo$: string[] = ["Femenino", "Masculino"];
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
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  turnoSelected$: Observable<Turno>;
  turnoSelected: Turno;
  reservaSelected$: Observable<ReservaRespuesta>; 

  constructor(
    private store: Store<{ reservaTurno: ReservaFormulario }>
  ) {
    this.turnoSelected$ = store.select(
      ReservaSelector.getTurnoSelected
    );
  }


  ngOnInit() {
  }

  reservar() {
    this.turnoSelected$.subscribe(turno => this.turnoSelected = turno);    

    var paciente = new Paciente();
    paciente.dni = this.dni.value;
    paciente.sexo = this.sexo.value === 'Femenino' ? 'F' : 'M';
    paciente.nombreApellido = this.nombreApellido.value;
    paciente.telefono = this.telefono.value;
    paciente.mail = this.mail.value;
    
    //paciente.fechaNacimiento =
    //paciente.codigoObraSocial = this.dni.value;
    //paciente.codigoPlan = this.dni.value;

    this.store.dispatch(ReservaAction.setPaciente({paciente}));

    this.onSubmit();  
  }

  onSubmit() {
    this.store.select(ReservaSelector.reservarTurno).subscribe(
      (filter: ReservaTurnoRequest) => {
        this.store.dispatch(ReservaAction.reservaTurno({filter}));
      }, err => console.error(JSON.stringify(err))
    );
  }

  isValid() {
    let result = false;
    if (
      this.dni.valid  && this.sexo.valid && this.nombreApellido.valid && 
      this.telefono.valid && this.mail.valid
      ) {
      result = true;
    }
    return result;
  }

}
