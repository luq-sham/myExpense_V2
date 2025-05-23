import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.page.html',
  styleUrls: ['./error-message.page.scss'],
  standalone: true,
  imports: [IonIcon, CommonModule, FormsModule]
})
export class ErrorMessagePage implements OnInit {

  @Input() message!: string;
  @Input() field?: AbstractControl;
  @Input() error!: string;
  @Input() submitted!: boolean;
  constructor() { }

  ngOnInit() {
  }
  shouldShowError() {
    if ((this.field?.touched && this.field?.errors?.[this.error]) || (this.submitted && this.field?.errors?.[this.error])) {
      return true;
    }

    return false;
  }

}
