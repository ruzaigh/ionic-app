import {Component, OnDestroy, OnInit} from '@angular/core';
import {Booking} from './booking.model';
import {BookingService} from './booking.service';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingsSub: Subscription;
  constructor(
    private bookingSerive: BookingService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.bookingsSub = this.bookingSerive.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  onCancelBooking(bookingId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log(bookingId);
    this.loadingCtrl.create({message: 'Cancelling...'})
      .then(loadingEl => {
      loadingEl.present();
      this.bookingSerive.cancelBooking(bookingId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.bookingsSub) {
      this.bookingsSub.unsubscribe();
    }
  }
}
