import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Inject } from '@angular/core';
import { CallService } from '../../../services/call/call.service';
import { TCall } from '../../../types/dtos/call';

@Component({
  selector: 'app-put',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgIf,
  ],
  templateUrl: './put.component.html',
  styleUrl: './put.component.scss',
})
export class PutComponent {
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TCall,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly callService: CallService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [this.data.id, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      duration: [this.data.duration, [Validators.required]],
      madeOn: [this.data.madeOn, [Validators.required]],
      isCompleted: [this.data.isCompleted, [Validators.required]],
      type: [this.data.type, [Validators.required]],
    });
  }

  onSubmit(): void {
    this.callService.put(this.formGroup.value).subscribe({
      next: () => {
        this.snackBar.open('تم تعديل العميل بنجاح', 'تمام');
      },
      error: () => {
        this.snackBar.open('لم يتم التعديل', 'تمام', {
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
