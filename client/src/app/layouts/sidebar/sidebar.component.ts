import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { TColumnType } from '../../types/columns/columns';
import { ClientService } from '../../services/client/client.service';
import { Router } from '@angular/router';
import { CallService } from '../../services/call/call.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatCheckboxModule, MatDivider, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  route = signal('');
  readonly columnList: WritableSignal<TColumnType> = signal<TColumnType>({
    name: 'الجميع',
    completed: true,
    subColumns: computed(() =>
      this.route().includes('clients')
        ? [
            { name: 'الرقم', column: 'id', completed: true },
            { name: 'الاسم', column: 'name', completed: true },
            { name: 'التوصيف', column: 'description', completed: true },
            { name: 'الإقامة', column: 'address', completed: true },
            { name: 'المدخل', column: 'createdBy', completed: true },
            { name: 'التاريخ', column: 'createdOn', completed: true },
            { name: 'المعدل', column: 'updatedBy', completed: true },
            { name: 'اليوم', column: 'updatedOn', completed: true },
          ]
        : [
            { name: 'الرقم', column: 'id', completed: true },
            { name: 'التوصيف', column: 'description', completed: true },
            { name: 'المدة', column: 'duration', completed: true },
            { name: 'الوقت', column: 'madeOn', completed: true },
            { name: 'انتهت', column: 'isCompleted', completed: true },
            { name: 'النوع', column: 'type', completed: true },
            { name: 'المدخل', column: 'createdBy', completed: true },
            { name: 'التاريخ', column: 'createdOn', completed: true },
            { name: 'المعدل', column: 'updatedBy', completed: true },
            { name: 'اليوم', column: 'updatedOn', completed: true },
          ]
    ),
  });

  constructor(
    private readonly clientService: ClientService,
    private readonly callService: CallService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.set(this.router.url);

    this.router.events.subscribe(() => {
      this.route.set(this.router.url);
    });
  }

  readonly partiallyComplete = computed(() => {
    const column = this.columnList();
    if (!column.subColumns) {
      return false;
    }
    return (
      column.subColumns().some((column) => column.completed) &&
      !column.subColumns().every((column) => column.completed)
    );
  });

  update(completed: boolean, index?: number) {
    this.columnList.update((column) => {
      if (index === undefined) {
        column.completed = completed;
        column.subColumns().forEach((column) => (column.completed = completed));
      } else {
        column.subColumns()[index].completed = completed;
        column.completed =
          column.subColumns().every((column) => column.completed) ?? true;
      }
      return { ...column };
    });
    if (this.route().includes('clients')) {
      this.clientService.columns.set(
        this.columnList()
          .subColumns()
          .filter((column) => column.completed)
          .map((column) => column.column)
      );
      this.clientService.names.set(
        this.columnList()
          .subColumns()
          .filter((column) => column.completed)
          .map((column) => column.name)
      );
    } else {
      this.callService.columns.set(
        this.columnList()
          .subColumns()
          .filter((column) => column.completed)
          .map((column) => column.column)
      );
      this.callService.names.set(
        this.columnList()
          .subColumns()
          .filter((column) => column.completed)
          .map((column) => column.name)
      );
    }
  }
}
