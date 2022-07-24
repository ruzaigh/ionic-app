import { Injectable } from '@angular/core';
import { Place } from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, of} from 'rxjs';
import {delay, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

interface PlaceData{
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get place(){
    return this.places.asObservable();
  }
  fetchPlaces(){
    return this.http.get<{[key: string]: PlaceData}>('https://airbnb-f3c71-default-rtdb.firebaseio.com/offered-places.json')
    .pipe(map(resData =>{
      const places = [];
      for (const key in resData){
        if (resData.hasOwnProperty(key)){
          places.push(new Place(
            key,
            resData[key].title,
            resData[key].description,
            resData[key].imageUrl,
            resData[key].price,
            new Date(resData[key].availableFrom),
            new Date(resData[key].availableTo),
            resData[key].userId
          ));
        }
      }
      //if we have data
      return places;
      // testing if we do not have data
      // return [];
    }),
    tap(places => {
      this.places.next(places);
    }));
  }

  getPlace(id: string){
  return this.http.get<PlaceData>(
    `https://airbnb-f3c71-default-rtdb.firebaseio.com/offered-places/${id}.json`
  ).pipe(
    map(placeData => new Place(
        id,
        placeData.title,
        placeData.description,
        placeData.imageUrl,
        placeData.price,
        new Date(placeData.availableFrom),
        new Date(placeData.availableTo),
        placeData.userId
      ))
  );
 }


  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ){
    let generatedId: string;
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
    //after the ".com/" is what firebase need to store our data in so it could be named anything
    return this.http
      .post<{name: string}>('https://airbnb-f3c71-default-rtdb.firebaseio.com/offered-places.json', {
      ...newPlace
      ,id: null}).pipe(
       switchMap(resData =>{
         generatedId = resData.name;
         return this.places ;
       }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this.places.next(places.concat(newPlace));
        })
    );
  }

  updatePlace(placeId: string, title: string, description: string){
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        if(!places || places.length <= 0){
          // if we don't have data
          return this.fetchPlaces();
        }else{
          //if we had something from the start( then kinda useless to have )
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(`https://airbnb-f3c71-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          {...updatedPlaces[updatedPlaceIndex], id: null}
        );
      }),
      tap(() => {
        this.places.next(updatedPlaces);
      })
    );
  }
}
