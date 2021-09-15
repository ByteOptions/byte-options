package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.restaurant.Restaurant;
import com.codeup.byteoptions.data.restaurant.RestaurantsRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/restaurants", headers = "Accept=application/json", produces = "application/json")
public class RestaurantsController {

    private final RestaurantsRepository restaurantsRepository;

    public RestaurantsController(RestaurantsRepository restaurantsRepository) {
        this.restaurantsRepository = restaurantsRepository;
    }

    @PostMapping
    private void create(@RequestBody Restaurant restaurant){
        restaurantsRepository.save(restaurant);
    }
}
