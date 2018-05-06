import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainService } from '../../services/train.service';
import { AlertService } from '../../services/alert.service';

import { Locomotive } from '../../models/locomotive';
import { Train } from '../../models/train';

@Component({
  templateUrl: './train-assembly.component.html'
})
export class TrainAssemblyComponent implements OnInit {
  constructor(
    private trainService: TrainService,
    private alertService: AlertService
  ) {}

  locomotives: Locomotive[];
  trains: Train[];

  ngOnInit() {
    this.getLocomotives();
    this.getTrains();
  }

  getLocomotives() {
    this.trainService.getLocomotives().subscribe(locomotives => {
      this.locomotives = locomotives;
    });
  }

  getTrains() {
    this.trainService.getTrains().subscribe(trains => {
      this.trains = trains;
    });
  }

  addTrain(form: NgForm) {
    const train = new Train(form.value.locomotive);
    this.trainService.addTrain(train).subscribe(train => {
        this.alertService.success('Train added', false);
        this.getTrains();
      });
    form.resetForm();
  }
}
