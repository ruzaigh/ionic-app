import {Injectable} from "@angular/core";
import {Booking} from "./booking.model";

@Injectable({providedIn: 'root'})
export class BookingService{
  private bookings: Booking[] = [
    new Booking(
    'b1',
      'p1',
    'u1',
    'Constantia',
      2,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
    ),
    new Booking(
      'b2',
      'p2',
      'u2',
      'Plattekloof',
      1,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
    ),
    new Booking(
      'b3',
      'p3',
      'u3',
      'Sea Point',
      3,
      new Date('2022-01-01'),
      new Date('2022-12-31'),
    )
  ];

  get bookingsList(){
    return [...this.bookings];
  }
  // deleteBooking(bookingId: string){
  //   this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
  // }
}
