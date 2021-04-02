import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [RestaurantsComponent, RestaurantComponent, LoaderComponent],
  imports: [CommonModule, RestaurantsRoutingModule, FormsModule],
  providers: [RestaurantService],
})
export class RestaurantsModule {}
