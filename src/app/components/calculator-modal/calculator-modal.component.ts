import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calculator-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './calculator-modal.component.html',
  styleUrls: ['./calculator-modal.component.scss']
})
export class CalculatorModalComponent {
  display = '0';

  constructor(private modalCtrl: ModalController) {}

  append(value: string) {
    if (this.display === '0') {
      this.display = value;
    } else {
      this.display += value;
    }
  }

  clear() {
    this.display = '0';
  }

  calculate() {
    try {
      this.display = eval(this.display).toString(); // Use safer parsing in real apps!
    } catch {
      this.display = 'Error';
    }
  }

  insert() {
    this.modalCtrl.dismiss(this.display);
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
