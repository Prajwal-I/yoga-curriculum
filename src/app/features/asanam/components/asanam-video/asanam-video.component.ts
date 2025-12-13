import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asanam-video',
  templateUrl: './asanam-video.component.html',
  styleUrls: ['./asanam-video.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AsanamVideoComponent implements OnInit {
  @Input() videoUrl: string = '';

  constructor() { }

  ngOnInit() { }

}
