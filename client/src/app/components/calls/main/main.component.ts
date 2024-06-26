import { Component, OnInit, computed } from '@angular/core';
import { TableComponent } from '../../common/table/table.component';
import { ETurnPage } from '../../../types/enums/turn';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EModalType } from '../../../types/enums/modal';
import { PostComponent } from '../post/post.component';
import { PutComponent } from '../put/put.component';
import { DeleteComponent } from '../delete/delete.component';
import { CallService } from '../../../services/call/call.service';
import { TCall } from '../../../types/dtos/call';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import { ExportsService } from '../../../services/exports/exports.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  columns = computed(() => [...this.callService.columns(), 'actions']);
  names = computed(() => [...this.callService.names(), 'القرارات']);
  clientId: number = 1;
  data: TCall[] = [];

  constructor(
    public callService: CallService,
    private readonly dialog: MatDialog,
    private tokenService: TokenService,
    public exportsService: ExportsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.tokenService.validateToken();
    this.activatedRoute.params.subscribe((params) => {
      this.clientId = params['id'];
    });
    this.onFetchCalls();
  }

  onFetchCalls(): void {
    this.callService.getAll(this.clientId).subscribe({
      next: (response) => {
        this.callService.totalCount = response.totalCount;
        this.callService.totalPages = response.totalPages;
        this.data = response.data;
      },
    });
  }

  onOpenDialog(event: { modal: EModalType; data?: TCall }) {
    console.log(event.data);

    switch (event.modal) {
      case EModalType.Post:
        this.dialog.open(PostComponent);
        break;
      case EModalType.Put:
        this.dialog.open(PutComponent, {
          data: event.data,
        });
        break;
      default:
        this.dialog.open(DeleteComponent, {
          data: event.data?.id,
        });
    }
  }

  onTurn(turnType: ETurnPage): void {
    turnType === ETurnPage.Next
      ? this.callService.getNextPage(this.clientId).subscribe({
          next: (response) => {
            this.callService.totalCount = response.totalCount;
            this.callService.totalPages = response.totalPages;
            this.data = response.data;
          },
        })
      : this.callService.getPreviousPage(this.clientId).subscribe({
          next: (response) => {
            this.callService.totalCount = response.totalCount;
            this.callService.totalPages = response.totalPages;
            this.data = response.data;
          },
        });
  }

  onGoBack(): void {
    this.router.navigateByUrl('dashboard/clients');
  }
}
