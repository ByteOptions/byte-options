package com.codeup.byteoptions.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ViewController {

//    @Value("${MAPBOX_KEY}")
//    private String mapboxKey;
//
//    @Value("${GOOGLE_KEY}")
//    private String googleKey;
//
//    @Value("${SPOON_KEY}")
//    private String spoonKey;

//    private final String keys = String.format("export function returnGoogleKey(){\n" +
//            "    return %s;\n" +
//            "}\n" +
//            "export function returnMapboxKey(){\n" +
//            "    return %s\n" +
//            "}\n" +
//            "export function returnSpoonKey(){\n" +
//            "    return %s\n" +
//            "}", googleKey, mapboxKey, spoonKey);

    @RequestMapping({"/", "/recipes", "/restaurants", "/login", "/home","/register","/account", "/users"})
    public String showValue() {
        return "forward:/index.html";
    }


//    for deployment
//@GetMapping(path = "/keys.js", produces = "application/javascript")
//public String apikey(){
//    return keys;
//}

}
