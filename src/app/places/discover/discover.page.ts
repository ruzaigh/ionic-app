import {Component, OnDestroy, OnInit} from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import {MenuController, SegmentChangeEventDetail} from "@ionic/angular";
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {

  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  relevantPlaces: Place[];
  private placeSub: Subscription;
  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.placeSub = this.placesService.place.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    });
    //for vitual scrolling
    // this.listedLoadedPlaces = this.placesService.place.slice(1);
  }
  onOpenMenu() {
    this.menuCtrl.toggle();
  }
  filterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }else {
      this.relevantPlaces = this.loadedPlaces.filter(
        place => place.userId !== this.authService.userID
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
    console.log(event.detail);
  }
  // filterUpdate(filter: string) {
  //   this.authService.userID.pipe(take(1)).subscribe(userId => {
  //     const isShown = place => filter === 'all' || place.userId !== userId;
  //     this.relevantPlaces = this.loadedPlaces.filter(isShown);
  //     this.filter = filter;
  //   });
  // }
  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }
}
