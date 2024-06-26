import { Component, OnInit, computed } from '@angular/core';
import { TableComponent } from '../../common/table/table.component';
import { ClientService } from '../../../services/client/client.service';
import { ETurnPage } from '../../../types/enums/turn';
import { TClientDTO } from '../../../types/dtos/client';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [TableComponent, MatButtonModule, MatIconModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  columns = computed(() => [...this.clientService.columns(), 'actions']);
  names = computed(() => [...this.clientService.names(), 'القرارات']);
  data: TClientDTO[] = [];

  constructor(
    public clientService: ClientService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next: (response) => {
        this.data = response;
      },
    });
  }

  openDialog() {
    this.dialog.open(PostComponent);
  }

  onTurn(turnType: ETurnPage): void {
    turnType === ETurnPage.Next
      ? this.clientService.getNextPage().subscribe({
          next: (response) => {
            this.data = response;
          },
        })
      : this.clientService.getPreviousPage().subscribe({
          next: (response) => {
            this.data = response;
          },
        });
  }
}
