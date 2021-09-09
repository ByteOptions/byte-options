package com.codeup.byteoptions.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {
    @RequestMapping({"/", "/recipes", "/restaurants", "/login", "/home","/register","/account"})
    public String showValue() {
        return "forward:/index.html";
    }
}
