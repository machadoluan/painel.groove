import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardsService } from '../../service/cards.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovidadeService } from '../../service/novidade.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ToastrService } from '../../service/toastr.service';
import { ProgressSpinner } from 'primeng/progressspinner';



@Component({
  selector: 'app-novidade',
  imports: [CommonModule, FormsModule, ToggleSwitch, InputTextModule, DialogModule, ReactiveFormsModule, FormsModule, FileUploadModule, ProgressSpinner],
  templateUrl: './novidade.component.html',
  styleUrl: './novidade.component.scss'
})
export class NovidadeComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  constructor(private novidadeService: NovidadeService, private cdr: ChangeDetectorRef, private fb: FormBuilder, private toastrService: ToastrService) {
    this.dados = this.fb.group({
      title: ['', Validators.required],
      videoLink: ['']
    })
  }

  selectedFile: File | undefined;
  imagePreview: string | undefined
  fullScreenImageUrl: string | null = null;
  visibilidade: boolean = false
  editingCard: any = null;
  visibleCriar: boolean = false
  dados: FormGroup;
  visibleEdit: boolean = false
  novidades: any[] = [];
  itemEdit: any;
  isLoading = false;
  nameLoading: string =''


  ngOnInit(): void {
    this.loadNovidades()
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

  openFullScreenImage(imageUrl: string): void {
    this.fullScreenImageUrl = imageUrl; // Exibe a imagem em tela cheia
  }

  closeFullScreenImage(): void {
    this.fullScreenImageUrl = null; // Fecha a imagem em tela cheia
  }

  removeFile(): void {
    this.selectedFile = undefined // Remove o arquivo do array de arquivos selecionados
    this.imagePreview = ''

    this.fileInput.nativeElement.value = '';
  }


  create() {
    if (this.selectedFile) {
      const dadosFormatados = {
        title: this.dados.value.title,
        videoLink: this.dados.value.videoLink,
        visibilidade: this.visibilidade
      }

      this.isLoading = true;
      this.nameLoading = 'Criando novidade...'


      this.novidadeService.create(dadosFormatados, this.selectedFile).subscribe({
        next: (res: any) => {
          this.toastrService.showSucess("Novidade criada com sucesso")
          console.log(res)
          this.limparDados();
          this.visibleCriar = false
          this.loadNovidades()
        },
        error: (err: any) => {
          this.toastrService.showError("Erro ao criar novidade, tente novidade")
          console.log(err)
          this.isLoading = false;

        },

        complete: () => {
          this.isLoading = false;
        }
      })

      console.log(dadosFormatados)

    }
  }

  limparDados() {
    this.dados.reset();
    this.selectedFile = undefined;
    this.imagePreview = ''
  }

  loadNovidades() {
    this.novidadeService.getNovidades().subscribe({
      next: (res: any) => {
        console.log(res)
        this.novidades = res
      },
      error: (err: any) => {
        console.log(err)

      }
    })
  }

  alterarVisibilidade(item: any, index: number) {
    console.log(`Item ${index} alterado. Novo valor:`, item.visibilidade);

    // Aqui você pode chamar o backend, ex:
    this.novidadeService.updateVisibilidade(item.id, item.visibilidade).subscribe({
      next: () => {
        console.log('Visibilidade atualizada com sucesso');
      },
      error: (err) => {
        console.error('Erro ao atualizar visibilidade', err);
        // Reverter mudança se falhar:
        item.visibilidade = !item.visibilidade;
      }
    });
  }

  editNovidade(item: any) {
    this.visibleEdit = true
    this.dados.patchValue({ ...item })
    this.imagePreview = item.fotoLink
    this.itemEdit = item
    console.log(item)
  }

  updateEdit() {
    const item = this.itemEdit

    const dadosFormatados = {
      title: this.dados.value.title,
      videoLink: this.dados.value.videoLink,
      visibilidade: this.visibilidade
    }

    if (this.selectedFile) {
      this.novidadeService.update(item.id, dadosFormatados, this.selectedFile).subscribe({
        next: (res: any) => {
          this.toastrService.showSucess("Novidade atualizada com sucesso");
          console.log(res);
          this.visibleEdit = false;
          this.loadNovidades();
        },
        error: (err: any) => {
          this.toastrService.showError("Erro ao atualizar novidade, tente novamente");
          console.log(err);
        }
      });
    } else {
      this.novidadeService.update(item.id, dadosFormatados).subscribe({
        next: (res: any) => {
          this.toastrService.showSucess("Novidade atualizada com sucesso");
          console.log(res);
          this.visibleEdit = false;
          this.loadNovidades();
        },
        error: (err: any) => {
          this.toastrService.showError("Erro ao atualizar novidade, tente novamente");
          console.log(err);
        }
      });
    }
  }

  closeModal() {
    this.limparDados()
  }

  delete(id: number) {
    this.isLoading = true
    this.nameLoading = 'Apagando novidade...'

    this.novidadeService.delete(id).subscribe({
      next: (res: any) => {
        this.toastrService.showSucess("Novidade apagada com sucesso")
        console.log(res)
        this.loadNovidades()
      },
      error: (err: any) => {
        this.toastrService.showError("Erro ao apagar novidade, tente novidade")
        console.log(err)
        this.isLoading = false;


      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
