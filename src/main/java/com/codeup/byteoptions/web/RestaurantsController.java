package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.restaurant.Restaurant;
import com.codeup.byteoptions.data.restaurant.RestaurantsRepository;
import com.codeup.byteoptions.data.user.User;
import com.codeup.byteoptions.data.user.UsersRepository;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/restaurants", headers = "Accept=application/json", produces = "application/json")
public class RestaurantsController {

    private final RestaurantsRepository restaurantsRepository;
    private final UsersRepository usersRepository;


    public RestaurantsController(RestaurantsRepository restaurantsRepository, UsersRepository usersRepository) {
        this.restaurantsRepository = restaurantsRepository;
        this.usersRepository = usersRepository;
    }

    @PostMapping
    private void addRestaurant(@RequestBody Restaurant restaurant, OAuth2Authentication auth){
        System.out.println(auth);
        String email = auth.getName();
        User user = usersRepository.findByEmail(email).get();
        user.addRestaurants(restaurant);
        restaurantsRepository.save(restaurant);
    }
}
