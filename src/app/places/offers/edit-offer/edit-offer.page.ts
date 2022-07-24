import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {PlacesService} from "../../places.service";
import {Place} from "../../place.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  placeID: string;
  isLoading: boolean;
  private placesSub: Subscription;
  constructor(
    private router: ActivatedRoute,
    private navCrtl: NavController,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private rout: Router
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe(paramMap =>{
      //checking thee existing of the placeId in the url
      if(!paramMap.has('placeId')){
        this.navCrtl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placeID = paramMap.get('placeId');
      this.isLoading = true;
      this.placesSub = this.placesService.getPlace(paramMap
        .get('placeId'))
        .subscribe(place => {
          this.place = place;
          this.form = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            description: new FormControl(this.place.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(180)]
            })
          });
          this.isLoading = false;
       },error => {
          //if we have an error
          this.alertCtrl.create({
            header: 'An error occurred!',
            message: 'Place could not be fetched. Please try again later.',
            buttons: [{text: 'Okay', handler: () => {
              this.rout.navigate(['/places/tabs/offers']);
            }}]
          }).then(alertEl => {
            alertEl.present();
          });
        });
    });
  }

  onUpdateOffer(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message: 'Updating place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placesService.updatePlace(
        this.place.id,
        this.form.value.title,
        this.form.value.description
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.navCrtl.navigateBack('/places/tabs/offers');
      });
    });
  }

  ngOnDestroy(){
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
}
