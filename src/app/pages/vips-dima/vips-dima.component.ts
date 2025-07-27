import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardsService } from '../../service/cards.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vips-dima',
  imports: [CommonModule, FormsModule],
  templateUrl: './vips-dima.component.html',
  styleUrl: './vips-dima.component.scss'
})
export class VipsDimaComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    
    constructor(private cardService: CardsService, private cdr: ChangeDetectorRef,){}

  imagePreview: string | undefined
  selectedFile: File | undefined;
  vipItem: any
  editingCard: any = null;


  cardData = {
    title: '',
    description: '',
    dateValidade: '',
    detalis: '',
    price: ''
  }

  resetForm() {
    this.cardData = {
      title: '',
      description: '',
      dateValidade: '',
      detalis: '',
      price: ''
    };
    this.imagePreview = undefined;
    this.selectedFile = undefined;
    this.editingCard = null;
  }
  

  ngOnInit(): void {
    this.cardService.getVips().subscribe({
      next: (res: any)  => {
        this.vipItem = res
        // this.cdr.detectChanges();
        console.log(this.vipItem)
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

    save() {
      if (!this.cardData.title || !this.cardData.description || !this.cardData.dateValidade || !this.cardData.detalis || !this.cardData.price) {
        return console.error('Preencha todos os campos');
      }

      if (this.editingCard) {
        // Modo de edição
        if(this.selectedFile)
        this.cardService.updateVip(this.editingCard.id, this.cardData, this.selectedFile).subscribe({
          next: (res) => {
            console.log('Card atualizado', res);
            this.editingCard = null;
            this.refreshCards();
          },
          error: (err) => console.error(err)
        });
      } 
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


  editCard(card: any) {
    this.editingCard = card;
    this.cardData = {
      title: card.title,
      description: card.description,
      dateValidade: card.dateValidade,
      detalis: card.detalis,
      price: card.price
    };
    this.imagePreview = card.photo;
  }
  
  refreshCards() {
    this.cardService.getVips().subscribe({
      next: (res: any) => {
        this.vipItem = res;
        this.resetForm();
      },
      error: (err) => console.error(err)
    });
  }
  

}
