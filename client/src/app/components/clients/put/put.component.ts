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
import { ClientService } from '../../../services/client/client.service';
import { NgIf } from '@angular/common';
import { TClientDTO } from '../../../types/dtos/client';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-put',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './put.component.html',
  styleUrl: './put.component.scss',
})
export class PutComponent {
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TClientDTO,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly clientService: ClientService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [this.data.id, [Validators.required]],
      name: [this.data.name, [Validators.required]],
      address: [this.data.address, [Validators.required]],
      description: [this.data.description, [Validators.required]],
    });
  }

  onSubmit(): void {
    this.clientService.put(this.formGroup.value).subscribe({
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
