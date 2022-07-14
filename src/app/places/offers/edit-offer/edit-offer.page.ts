import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {PlacesService} from "../../places.service";
import {Place} from "../../place.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;
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
      this.form = new FormGroup({
        //the add the starting value to the data we get above i.e "this.place.title"
        title: new FormControl(this.place.title,{
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(this.place.description,{
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
      });
    });
  }

  onUpdateOffer(){
    if(this.form.valid){
      return;
    }
  }
}
