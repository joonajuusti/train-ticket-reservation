import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainService } from '../../services/train.service';
import { AlertService } from '../../services/alert.service';

import { Locomotive } from '../../models/locomotive';

@Component({
  templateUrl: './locomotive.component.html'
})
export class LocomotiveComponent implements OnInit {
  constructor(
    private trainService: TrainService,
    private alertService: AlertService
  ) {}

  locomotives: Locomotive[];

  ngOnInit() {
    this.getLocomotives();
  }

  getLocomotives() {
    this.trainService.getLocomotives().subscribe(locomotives => {
      this.locomotives = locomotives;
      console.log(this.locomotives);
    });
  }

  addLocomotive(form: NgForm) {
    const locomotive = new Locomotive(form.value.id);
    this.trainService.addLocomotive(locomotive).subscribe(locomotive => {
        this.alertService.success('Locomotive added', false);
        this.getLocomotives();
      });
    form.resetForm();
  }
}
