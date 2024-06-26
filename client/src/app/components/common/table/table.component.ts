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

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() columns: string[] = [];
  @Input() names: string[] = [];
  @Input() data: any = [];
  @Output() turn = new EventEmitter();

  dataSource = new MatTableDataSource(this.data);

  @ViewChild(MatPaginator) paginator: any;

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onTurn(event: any): void {
    this.turn.emit(
      event.pageIndex > event.previousPageIndex
        ? ETurnPage.Next
        : ETurnPage.Previous
    );
  }
}
