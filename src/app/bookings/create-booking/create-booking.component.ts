import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Place} from '../../places/place.model';
import {ModalController} from '@ionic/angular';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  startDate: string;
  endDate: string;
  @ViewChild('f', {static: true}) form: NgForm;
  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    const avaiableFrom = new Date(this.selectedPlace.availableFrom);
    const avaiableTo = new Date(this.selectedPlace.availableTo);
    if(this.selectedMode === 'random') {
      //random date between the range of available dates
      this.startDate =
        new Date(avaiableFrom.getTime() +
        Math.random() *(
          avaiableTo.getTime() -
            7 * 24 * 60 * 60 * 1000 -
            avaiableFrom.getTime())
        ).toISOString();
      //end date based off the calc from the start date
      this.endDate =
        new Date(new Date(this.startDate).getTime() +
        Math.random() *
          (new Date(this.startDate).getTime() +
            6 * 24 * 60 * 60 * 1000 -
            new Date(this.startDate).getTime())
        ).toISOString();
    }
  }

  onBookPlace(){
    if(!this.form.valid || !this.dataValid()) {
      return;
    }
    this.modalCtrl.dismiss( {
      bookingData:{
        firstName: this.form.value['first-name'],
        lastName: this.form.value['last-name'],
        guestNumber: +this.form.value['guest-number'],
        startDate: new Date(this.form.value['date-from']),
        endDate: new Date(this.form.value['date-to']),
      }
    }, 'confirm');
  }

  onCancel(){
      this.modalCtrl.dismiss(null ,'cancel');
  }

 dataValid() {
  const startDate = new Date(this.form.value['date-from']);
  const endDate = new Date(this.form.value['date-to']);
  return endDate > startDate;
 }
}
