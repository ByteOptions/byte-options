package com.codeup.byteoptions.web;


import com.codeup.byteoptions.data.user.User;
import com.codeup.byteoptions.data.user.UsersRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value= "/api/users", headers = "Accept=application/json", produces = "application/json")

public class UsersController {

    private final UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
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

    @PostMapping
    private void createUser(@RequestBody User newUser){
        usersRepository.save(newUser);
    }
}
