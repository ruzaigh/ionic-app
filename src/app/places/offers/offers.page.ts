import {Component, OnDestroy, OnInit} from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import {Subscription} from "rxjs";
import {IonItemSliding} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  isLoading: boolean;
  private placesSub: Subscription;
  constructor(
    private placesService: PlacesService,
    private router: Router
  ) { }

  ngOnInit() {
  this.placesSub =  this.placesService.place.subscribe(places => {
      this.offers = places;
    });
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }
  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
