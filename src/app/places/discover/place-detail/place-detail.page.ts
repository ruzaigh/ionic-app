import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { NavController } from '@ionic/angular';
import {PlacesService} from "../../places.service";
import {Place} from "../../place.model";

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private router: ActivatedRoute,
    private navCrtl: NavController,
    private placeService: PlacesService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap =>{
      //checking thee existing of the placeId in the url
      if(!paramMap.has('placeId')){
        this.navCrtl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace(){
    // this.router.navigateByUrl('/places/tabs/discover');
    this.navCrtl.navigateBack('/places/tabs/discover');
  }
}
