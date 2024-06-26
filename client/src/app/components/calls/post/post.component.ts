import { Component, OnInit } from '@angular/core';
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
import { CallService } from '../../../services/call/call.service';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgIf,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  formGroup: FormGroup;
  clientId: number = 1;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly callService: CallService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      madeOn: ['', [Validators.required]],
      isCompleted: ['', [Validators.required]],
      type: ['', [Validators.required]],
      clientId: [this.clientId, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.clientId = params['id'];
    });
  }

  onSubmit(): void {
    this.callService.post(this.formGroup.value).subscribe({
      next: () => {
        this.snackBar.open('تم إضافة المكالمة بنجاح', 'تمام');
      },
      error: () => {
        this.snackBar.open('لم يتم التسجيل', 'تمام', {
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
