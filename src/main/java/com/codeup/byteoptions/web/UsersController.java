package com.codeup.byteoptions.web;


import com.codeup.byteoptions.data.user.User;
import com.codeup.byteoptions.data.user.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value= "/api/users", headers = "Accept=application/json", produces = "application/json")

public class UsersController {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public UsersController(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }



    @GetMapping("/me")
    private User getThisUser(OAuth2Authentication auth){
        String email = auth.getName();
        User user = usersRepository.findByEmail(email).get();
        return user;

    }
    @GetMapping
    private List<User> getUsers(){
        return usersRepository.findAll();
    }

    //    @GetMapping("/findByEmail")
    //    private User getUserByEmail(@RequestParam String email){
    //        System.out.println(email);
    //        return usersRepository.findByEmail(email).get();
    //    }
    @DeleteMapping("/deleteRecipe/{id}")
    private void deleteRecipeFromUser(@PathVariable Long id, OAuth2Authentication auth){
        String email = auth.getName();
        User user = usersRepository.findByEmail(email).get();
        user.deleteRecipe(id);
        usersRepository.save(user);
    }
    @DeleteMapping("/deleteRestaurant/{id}")
    private void deleteRestaurantFromUser(@PathVariable Long id, OAuth2Authentication auth){
        String email = auth.getName();
        User user = usersRepository.findByEmail(email).get();
        user.deleteRestaurant(id);
        usersRepository.save(user);
    }
    @DeleteMapping("/deleteVideo/{id}")
    private void deleteVideoFromUser(@PathVariable Long id, OAuth2Authentication auth){
        String email = auth.getName();
        User user = usersRepository.findByEmail(email).get();
        user.deleteVideo(id);
        usersRepository.save(user);
    }

    @PostMapping
    private void createUser(@RequestBody User newUser){
        System.out.println(newUser.getCenter());
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        usersRepository.save(newUser);
    }
}
