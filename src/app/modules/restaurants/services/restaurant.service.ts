import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  images = [];
  restaurant: any;

  constructor(private http: HttpClient) {
    this.getImages();
  }

  getImages() {
    const url =
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json';

    this.http.get(url).subscribe((response: any) => {
      if (response.length) {
        this.images = response.map((o: any) => o.Image);
      }
    });
  }

  getRestaurants(filter?: any) {
    const url =
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json';

    return new Observable((observer) => {
      this.http.get(url).subscribe(
        (response: any) => {
          if (this.images.length) {
            let result = response.filter((restaurant: any) => {
              // generate random index from available images
              const index = Math.floor(
                Math.random() * (this.images.length - 1) + 1
              );
              restaurant.Image = this.images[index || 1];

                if (filter.searchText.length) {
                  return restaurant.Brand.toLocaleLowerCase().includes(filter.searchText.toLocaleLowerCase());
                }
                return true;
            });
            if (filter.sortByStars) {
              result = result.sort((a:any, b:any) => {
                if (typeof (a.Stars) !== 'number') {
                  return -1;
                }
                if (typeof (a.Stars) !== 'number') {
                  return 1;
                }
                
                return a.Stars - b.Stars;
              });

              if (filter.sortOrder === 'desc') {
                result.reverse();
              }
            }
             
            observer.next(result);
          }
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getActiveRestaurant() {
    return this.restaurant;
  }

  setActiveRestaurant(restaurant: any) {
    this.restaurant = restaurant;
  }

  clearActiveRestaurant() {
    this.restaurant = null;
  }
}
