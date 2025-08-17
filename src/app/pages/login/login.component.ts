import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '../../service/toastr.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'acesso_negado') {
        this.toastr.showError('Acesso negado')
      }
    });
  }
  loginWithDiscord() {
    window.location.href = `${environment.apiUrl}/auth/discord-panel`;

  }
}
