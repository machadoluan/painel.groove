import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  imports: [TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = [
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
    {id: 1, nick: 'Luan Machado', profissao: 'Policia', tempoOnline: '1h'},
  ];
}
