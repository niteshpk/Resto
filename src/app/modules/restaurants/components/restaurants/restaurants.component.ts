import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  activeSubscriptions: Subscription[] = [];
  restaurants: any = [];
  filter = {
    searchText: '',
    sortByStars: false,
    sortOrder: 'asc',
  };
  loading = true;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    const subscription = this.restaurantService
      .getRestaurants(this.filter)
      .subscribe(
        (response) => {
          this.loading = false;
          this.restaurants = response;
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    this.activeSubscriptions.push(subscription);
  }

  showStars(star: any) {
    return typeof star === 'number';
  }

  showTopTen(restaurant: any) {
    return restaurant['Top Ten'] !== 'NaN';
  }

  navigate(index: number, restaurant: any) {
    this.router.navigate(['/restaurants/' + index]);
    this.restaurantService.setActiveRestaurant(restaurant);
  }

  ngOnDestroy() {
    if (this.activeSubscriptions.length) {
      this.activeSubscriptions.forEach((subscription) =>
        subscription.unsubscribe()
      );
    }
  }
}
