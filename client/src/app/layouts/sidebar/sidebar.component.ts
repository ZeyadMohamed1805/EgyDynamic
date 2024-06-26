import { Component, WritableSignal, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { TColumnType } from '../../types/columns/columns';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatCheckboxModule, MatDivider, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly columnList: WritableSignal<TColumnType> = signal<TColumnType>({
    name: 'الجميع',
    completed: true,
    subColumns: [
      { name: 'الرقم', column: 'id', completed: true },
      { name: 'الاسم', column: 'name', completed: true },
      { name: 'التوصيف', column: 'description', completed: true },
      { name: 'الإقامة', column: 'address', completed: true },
      { name: 'المدخل', column: 'createdBy', completed: true },
      { name: 'التاريخ', column: 'createdOn', completed: true },
      { name: 'المعدل', column: 'updatedBy', completed: true },
      { name: 'اليوم', column: 'updatedOn', completed: true },
    ],
  });

  constructor(private readonly clientService: ClientService) {}

  readonly partiallyComplete = computed(() => {
    const column = this.columnList();
    if (!column.subColumns) {
      return false;
    }
    return (
      column.subColumns.some((column) => column.completed) &&
      !column.subColumns.every((column) => column.completed)
    );
  });

  update(completed: boolean, index?: number) {
    this.columnList.update((column) => {
      if (index === undefined) {
        column.completed = completed;
        column.subColumns?.forEach((column) => (column.completed = completed));
      } else {
        column.subColumns![index].completed = completed;
        column.completed =
          column.subColumns?.every((column) => column.completed) ?? true;
      }
      return { ...column };
    });
    this.clientService.columns = this.columnList()
      .subColumns.filter((column) => column.completed)
      .map((column) => column.column);
    this.clientService.names = this.columnList()
      .subColumns.filter((column) => column.completed)
      .map((column) => column.name);
  }
}
