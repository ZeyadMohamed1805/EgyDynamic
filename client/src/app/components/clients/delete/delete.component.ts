import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly snackBar: MatSnackBar,
    private readonly clientService: ClientService
  ) {}

  onDelete(): void {
    this.clientService.delete(this.data).subscribe({
      next: () => {
        this.snackBar.open('تم حذف العميل بنجاح', 'تمام');
      },
      error: () => {
        this.snackBar.open('لم يتم الحذف', 'تمام', {
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
