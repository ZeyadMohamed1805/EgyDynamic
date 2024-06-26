import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../common/table/table.component';
import { ClientService } from '../../../services/client/client.service';
import { ETurnPage } from '../../../types/enums/turn';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  names: string[] = [
    'الرقم',
    'الاسم',
    'التوصيف',
    'الإقامة',
    'المدخل',
    'التاريخ',
    'المعدل',
    'اليوم',
  ];
  columns: string[] = [
    'id',
    'name',
    'description',
    'address',
    'createdBy',
    'createdOn',
    'updatedBy',
    'updatedOn',
  ];
  data: any = [];

  constructor(public clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next: (response: any) => {
        this.data = response;
      },
    });
  }

  onTurn(turnType: ETurnPage): void {
    turnType === ETurnPage.Next
      ? this.clientService.getNextPage().subscribe({
          next: (response: any) => {
            this.data = response;
          },
        })
      : this.clientService.getPreviousPage().subscribe({
          next: (response: any) => {
            this.data = response;
          },
        });
  }
}
