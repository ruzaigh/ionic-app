import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {PlacesService} from "../../places.service";
import {Place} from "../../place.model";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  constructor(
    private router: ActivatedRoute,
    private navCrtl: NavController,
    private placesService: PlacesService
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap =>{
      //checking thee existing of the placeId in the url
      if(!paramMap.has('placeId')){
        this.navCrtl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

}
