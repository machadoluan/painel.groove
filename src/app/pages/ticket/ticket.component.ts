import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TicketsService } from '../../service/tickets.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../service/auth.service';

// DTO para Ticket (Data Transfer Object)
export interface TicketDto {
  id: number;
  userId: number;
  idDenunciado?: number | null;
  adminId?: number | null;
  status: 'Aberto' | 'atendendo' | 'Fechado' | 'pending' | 'new';
  subject: string;
  motivo: string;
  url?: string | null;
  personagem?: string | null;
  messages: TicketMessageDto[];
  createdAt: string;
  updatedAt: string;
  user: any
}

export interface TicketMessageDto {
  id: number;
  sender: string;
  message: string;
  createdAt: string;
  // Adicione outros campos conforme necessário
}


@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    TabsModule,
    TableModule,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class TicketComponent {

  private readonly ticketService = inject(TicketsService);
  private readonly authService = inject(AuthService);

  readonly tickets$: Observable<TicketDto[]> = this.ticketService.getTickets() as Observable<TicketDto[]>;

  constructor() {
    this.tickets$.subscribe(tickets => {
      console.log('Tickets:', tickets);
    });
  }
}
