import { Component, OnInit } from '@angular/core';
import { LogService } from '../../service/log.service';
import { FivemService } from '../../service/fivem.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estatisticas',
  imports: [CommonModule],
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.scss'
})
export class EstatisticasComponent implements OnInit {

  constructor(private log: LogService, private fivemService: FivemService) { }

  metricas = {
    acessosPorIPFixo: 0,
    discordsVinculados: 0,
    acessosTotais: 0,
    cliquesDiscord: 0,
    cliquesListaEspera: 0,
    cliquesFecharTelaLista: 0,
    cliquesCompraVipDiamante: 0,
    abandonoCarrinho: 0,
    cliquesComprarC6: 0,
    fazerAllowlist: 0,
    cancelarAllowlist: 0
  };

  serverOnline: boolean = false;
  jogadoresOnline: number = 0;
  capacidadeMaxima: number = 0;

  ngOnInit(): void {
    this.buscarStatusServidor();
    this.log.getLog().subscribe({
      next: (res) => {
        this.metricas = { ...this.metricas, ...res };
      },
      error: (err) => {
        console.error('Erro ao carregar métricas:', err);
      }
    });
  }


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
