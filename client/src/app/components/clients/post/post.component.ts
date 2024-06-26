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

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  formGroup: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly clientService: ClientService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.clientService.post(this.formGroup.value).subscribe({
      next: () => {
        this.snackBar.open('تم إضافة العميل بنجاح', 'تمام');
      },
      error: () => {
        this.snackBar.open('لم يتم التسجيل', 'تمام', {
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
