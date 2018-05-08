import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RailroadCar } from '../../models/railroad-car';

import { TrainService } from '../../services/train.service';
import { AlertService } from '../../services/alert.service';

@Component({
  templateUrl: 'railroad-car.component.html'
})
export class RailroadCarComponent{
  constructor(
    private trainService: TrainService,
    private alertService: AlertService
  ) {}
  arrayOfLengthOfRowAmount: number[] = [0];
  arrayOfLengthOfThree: number[] = [0, 0, 0];
  length: number = 1;

  newLines() {
    let index: number;
    this.arrayOfLengthOfRowAmount = [];
    if(this.length > 0 && this.length <= 30){
      for(index = 0; index < this.length; index++) {
        this.arrayOfLengthOfRowAmount.push(0);
      }
    }
    console.log(this.arrayOfLengthOfRowAmount);
  }

  addRailroadCar(form: NgForm) {
    console.log('addRailroadCar');
    const railroadCar = new RailroadCar(form.value.railroadCarModel, this.length);
    this.trainService.addRailroadCar(railroadCar).subscribe(railroadCar => {
        this.alertService.success('Railroad car added', false);
      });
    form.resetForm();
  }
}
