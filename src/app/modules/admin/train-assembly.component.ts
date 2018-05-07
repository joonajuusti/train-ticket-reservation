import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainService } from '../../services/train.service';
import { AlertService } from '../../services/alert.service';

import { Locomotive } from '../../models/locomotive';
import { Train } from '../../models/train';
import { RailroadCar } from '../../models/railroad-car';

@Component({
  templateUrl: './train-assembly.component.html'
})
export class TrainAssemblyComponent implements OnInit {
  constructor(
    private trainService: TrainService,
    private alertService: AlertService
  ) {}

  locomotives: Locomotive[];
  railroadCars: RailroadCar[];
  trains: Train[];

  ngOnInit() {
    this.getLocomotives();
    this.getTrains();
    this.getRailroadCars();
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

  getRailroadCars() {
    this.trainService.getRailroadCars().subscribe(railroadCars => {
      this.railroadCars = railroadCars;
    });
  }

  addTrain(form: NgForm) {
    const train = new Train(
      form.value.trainName,
      form.value.locomotive,
      form.value.railroadCar,
      form.value.railroadCarAmount
    );
    this.trainService.addTrain(train).subscribe(train => {
        this.alertService.success('Train added', false);
        this.getTrains();
        console.log(train.railroadCar.numberOfRows)
      });
    form.resetForm();
  }
}
