import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FivemService } from '../../service/fivem.service';
import { LogService } from '../../service/log.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private log: LogService, private fivemService: FivemService) { }

  serverOnline: boolean = false;
  jogadoresOnline: number = 0;
  capacidadeMaxima: number = 0;

  products: any[] = [
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
    { id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h' },
  ];



  buscarStatusServidor() {
    this.fivemService.getServerStatus().subscribe((res) => {
      if (res && res.Data) {
        this.serverOnline = true;
        this.jogadoresOnline = res.Data.clients;
        this.capacidadeMaxima = res.Data.sv_maxclients;
      } else {
        this.serverOnline = false;
        this.jogadoresOnline = 0;
      }
    });
  }
}
