import { Component, WritableSignal, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { TColumnType } from '../../types/columns/columns';

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
    completed: false,
    subColumns: [
      { name: 'اسم العميل', column: 'name', completed: false },
      { name: 'محل الإقامة', column: 'address', completed: false },
      { name: 'التوصيف', column: 'description', completed: false },
      { name: 'ادخال بواسطة', column: 'createdBy', completed: false },
      { name: 'تاريخ الإدخال', column: 'createdOn', completed: false },
      { name: 'تعديل بواسطة', column: 'updatedBy', completed: false },
      { name: 'تاريخ التعديل', column: 'updatedOn', completed: false },
    ],
  });

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
  }
}
