import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { HistoryItem } from '../struct/question';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.page.html',
  styleUrls: ['./history-item.page.scss'],
})
export class HistoryItemPage implements OnInit
{
  // The history item being viewed.
  data: HistoryItem = null;

  // The duration of this session.
  duration: number = 0;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  async ngOnInit()
  {
    // Get the ID.
    const id = this.route.snapshot.params['id'];
    
    // Get all the history.
    const history: HistoryItem[] = await this.storageService.get('history') || [];

    if (history.length > id)
    {
      this.data = history[id];
      this.duration = this.data.endTime - this.data.startTime;
    }
  }

}
