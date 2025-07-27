import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardsService } from '../../service/cards.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovidadeService } from '../../service/novidade.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-novidade',
  imports: [CommonModule, FormsModule, ToggleSwitch, InputTextModule,DialogModule, ReactiveFormsModule, FormsModule],
  templateUrl: './novidade.component.html',
  styleUrl: './novidade.component.scss'
})
export class NovidadeComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  constructor(private novidadeService: NovidadeService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.dados = this.fb.group({
      title: ['', Validators.required],
    })
  }

  imagePreview: string | undefined
  selectedFile: File | undefined;
  novidadeItem: any
  editingCard: any = null;
  visibleCriar: boolean = false
  dados: FormGroup;

  ngOnInit(): void {
    this.novidadeService.getNovidades().subscribe({
      next: (res: any) => {
        this.novidadeItem = res
        // this.cdr.detectChanges();
        console.log(this.novidadeItem)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  save() {

  }


  onFilesSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      console.log('Arquivo selecionado:', file);

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imagePreview = base64String;
      };
      reader.readAsDataURL(file);
    }

    this.fileInput.nativeElement.value = '';
  }




}
