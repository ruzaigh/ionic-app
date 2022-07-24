import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController
} from '@ionic/angular';
import {PlacesService} from "../../places.service";
import {Place} from "../../place.model";
import {CreateBookingComponent} from "../../../bookings/create-booking/create-booking.component";
import {Subscription} from "rxjs";
import {BookingService} from "../../../bookings/booking.service";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit,OnDestroy {
  place: Place;
  isBookable = false;
  isLoading: boolean;
  private placesSub: Subscription;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private navCrtl: NavController,
    private modalCtrl: ModalController,
    private placeService: PlacesService,
    private actionCrtl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) { }


  ngOnInit() {
    this.router.paramMap.subscribe(paramMap => {
      //checking thee existing of the placeId in the url
      if (!paramMap.has('placeId')) {
        this.navCrtl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
     this.placesSub = this.placeService
       .getPlace(paramMap.get('placeId'))
       .subscribe(place => {
        this.place = place;
        //button will only show if the user has not booked the place
        this.isBookable = place.userId !== this.authService.userID;
        this.isLoading = false;
      }, error => {
        // if the place is not found, navigate back to the discover page
        this.alertCtrl.create({
          header: 'An error occurred!',
          message: 'Could not load place.',
          buttons: [{text: 'Okay', handler: () => {
            this.route.navigate(['/places/tabs/discover']);
          }
          }]
        }).then(alertEl => {
          alertEl.present();
            }
          );
       });
    });
  }

  onBookPlace() {
    this.actionCrtl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
        ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {selectedPlace: this.place, selectedMode: mode}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          this.loadingCtrl.create({
            message: 'Booking the place...'
          }).then(loadingEl => {
            loadingEl.present();
            const data = resultData.data.bookingData;
            this.placesSub = this.bookingService.addBooking(
              this.place.id,
              this.place.title,
              this.place.imageUrl,
              data.firstName,
              data.lastName,
              data.guestNumber,
              data.startDate,
              data.endDate
            ).subscribe(() => {
              loadingEl.dismiss();
              this.route.navigate(['/bookings']);
            }),
              error => {
                console.log(error);
                loadingEl.dismiss();
              };
          });
        }
      });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
