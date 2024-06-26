import { Component, OnInit, computed } from '@angular/core';
import { TableComponent } from '../../common/table/table.component';
import { ETurnPage } from '../../../types/enums/turn';
import { TClient } from '../../../types/dtos/client';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EModalType } from '../../../types/enums/modal';
import { PostComponent } from '../post/post.component';
import { PutComponent } from '../put/put.component';
import { DeleteComponent } from '../delete/delete.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { CallService } from '../../../services/call/call.service';
import { TCall } from '../../../types/dtos/call';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  columns = computed(() => [...this.callService.columns(), 'actions']);
  names = computed(() => [...this.callService.names(), 'القرارات']);
  clientId: number = 1;
  data: TCall[] = [];

  constructor(
    public callService: CallService,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.clientId = params['id'];
    });
    this.onFetchCalls();
  }

  onFetchCalls(): void {
    this.callService.getAll(this.clientId).subscribe({
      next: (response) => {
        this.callService.totalCount = response.totalCount;
        this.callService.totalPages = response.totalPages;
        this.data = response.data;
      },
    });
  }

  onOpenDialog(event: { modal: EModalType; data?: TClient }) {
    switch (event.modal) {
      case EModalType.Post:
        this.dialog.open(PostComponent);
        break;
      case EModalType.Put:
        this.dialog.open(PutComponent, {
          data: event.data,
        });
        break;
      default:
        this.dialog.open(DeleteComponent, {
          data: event.data?.id,
        });
    }
  }

  onTurn(turnType: ETurnPage): void {
    turnType === ETurnPage.Next
      ? this.callService.getNextPage(this.clientId).subscribe({
          next: (response) => {
            this.callService.totalCount = response.totalCount;
            this.callService.totalPages = response.totalPages;
            this.data = response.data;
          },
        })
      : this.callService.getPreviousPage(this.clientId).subscribe({
          next: (response) => {
            this.callService.totalCount = response.totalCount;
            this.callService.totalPages = response.totalPages;
            this.data = response.data;
          },
        });
  }

  onPrintTable() {
    const printContents = document.querySelector('.table')!.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  onExportTableToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      document.querySelector('.table')
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      'table.xlsx'
    );
  }

  onGoBack(): void {
    this.router.navigateByUrl('dashboard/clients');
  }
}
