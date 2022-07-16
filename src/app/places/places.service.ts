import { Injectable } from '@angular/core';
import { Place } from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {delay, map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([
    new Place(
      'p1',
      'Sea Point',
      'on the beaches of Sea Point',
      'https://asrealty.co.za/wp-content/uploads/2021/03/20210223_145922000_iOS.jpg',
      149.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Constantia ',
      'The largest selection of private property and houses',
      'https://images.prop24.com/262618887/Crop600x400',
      1149.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'Plattekloof ',
      'For Nice cenematic view',
      'https://images.prop24.com/282452257/Crop600x400',
      549.99,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
      'abc'
    )
  ]);

  constructor(private authService: AuthService) { }

  get place(){
    return this.places.asObservable();
  }

  getPlace(id: string){
  return this.places.pipe(
    take(1),
    map(places =>({ ...places.find(p => p.id === id)}))
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ){
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://images.prop24.com/282452257/Crop600x400',
      price,
      dateFrom,
      dateTo,
      this.authService.userID,
    );
    return this.places
      .pipe(take(1),
      delay(1000),
      tap(places =>{
        this.places.next(places.concat(newPlace));
      }));
  }

  updatePlace(placeId: string, title: string, description: string){
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places =>{
        const updatedPlaces = [...places];
        const oldPlaceIndex = updatedPlaces.findIndex(p => p.id === placeId);
        const oldPlace = updatedPlaces[oldPlaceIndex];
        updatedPlaces[oldPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this.places.next(updatedPlaces);
      }));
  }
}
