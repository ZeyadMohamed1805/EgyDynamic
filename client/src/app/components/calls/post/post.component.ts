import {
  Component,
  Inject,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  clientId: WritableSignal<number> = signal(1);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private readonly callService: CallService
  ) {
    this.formGroup = this.formBuilder.group({
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      madeOn: ['', [Validators.required]],
      isCompleted: ['', [Validators.required]],
      type: ['', [Validators.required]],
      clientId: [this.data, [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.data);
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
