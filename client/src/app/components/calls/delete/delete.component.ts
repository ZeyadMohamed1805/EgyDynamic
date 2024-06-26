import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CallService } from '../../../services/call/call.service';

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
    private readonly callService: CallService
  ) {}

  onDelete(): void {
    this.callService.delete(this.data).subscribe({
      next: () => {
        this.snackBar.open('تم حذف المكالمة بنجاح', 'تمام');
      },
      error: () => {
        this.snackBar.open('لم يتم الحذف', 'تمام', {
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
