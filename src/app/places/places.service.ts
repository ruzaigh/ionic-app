import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places: Place[] = [
    new Place(
      'p1',
      'Sea Point',
      'on the beaches of Sea Point',
      'https://asrealty.co.za/wp-content/uploads/2021/03/20210223_145922000_iOS.jpg',
      149.99,
    ),
    new Place(
      'p2',
      'Constantia ',
      'The largest selection of private property and houses',
      'https://images.prop24.com/262618887/Crop600x400',
      1149.99,
    ),
    new Place(
      'p3',
      'Plattekloof ',
      'For Nice cenematic view',
      'https://images.prop24.com/282452257/Crop600x400',
      549.99,
    )
  ];

  constructor() { }

  get place(){
    return [...this.places];
  }

  getPlace(id: string){
  return {...this.place.find(p => p.id === id)};
  }
}
