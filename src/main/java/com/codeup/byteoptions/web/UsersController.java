package com.codeup.byteoptions.web;


import com.codeup.byteoptions.data.user.User;
import com.codeup.byteoptions.data.user.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
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
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        usersRepository.save(newUser);
    }
}
