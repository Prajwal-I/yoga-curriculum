import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-patanjali-maharishi-statue',
  templateUrl: './patanjali-maharishi-statue.component.html',
  styleUrls: ['./patanjali-maharishi-statue.component.scss'],
  imports: [IonCard, IonCardContent, NgClass],
})
export class PatanjaliMaharishiStatueComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  getBgClassName(): string {
    //5 AM to 8 AM - dawn
    //8 AM to 5 PM - morning
    //5 PM to 8 PM - dusk
    //8 PM to 5 AM - night
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 8) {
      return 'dawn-bg';
    } else if (hours >= 8 && hours < 17) {
      return 'morning-bg';
    } else if (hours >= 17 && hours < 20) {
      return 'dusk-bg';
    }
    return 'night-bg';
  }
}
