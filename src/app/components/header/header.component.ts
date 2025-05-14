import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonMenuButton, IonButtons } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports:[IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton]
})
export class HeaderComponent  implements OnInit {

  @Input() title:any
  constructor() { }

  ngOnInit() {}

}
