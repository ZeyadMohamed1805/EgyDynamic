import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ETurnPage } from '../../../types/enums/turn';
import { TClientDTO } from '../../../types/dtos/client';
import { TPagination } from '../../../types/columns/pages';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EModalType } from '../../../types/enums/modal';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() columns: string[] = [];
  @Input() names: string[] = [];
  @Input() data: TClientDTO[] = [];
  @Output() turn = new EventEmitter();
  @Output() open = new EventEmitter();

  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator: any;

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onTurn(event: TPagination): void {
    this.turn.emit(
      event.pageIndex > event.previousPageIndex!
        ? ETurnPage.Next
        : ETurnPage.Previous
    );
  }

  onOpenModal(modalType: EModalType, element: TClientDTO): void {
    this.open.emit({ modal: modalType, data: element });
  }
}
