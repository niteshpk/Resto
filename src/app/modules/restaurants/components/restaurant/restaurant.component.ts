import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  id: any;
  restaurant: any;
  
  constructor(
    private route: ActivatedRoute, 
    private restaurantService: RestaurantService,
    private router: Router
    ) { 
    this.id = this.route.snapshot.params.id;
    this.restaurant = this.restaurantService.getActiveRestaurant();
  }

  ngOnInit(): void {
  }

  navigateBack() {
    this.router.navigateByUrl('/restaurants');
  }

  ngOnDestroy() {
    this.restaurantService.clearActiveRestaurant();
  }

}
