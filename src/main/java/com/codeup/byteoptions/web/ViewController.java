package com.codeup.byteoptions.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ViewController {

    @Value("${MAPBOX_KEY}")
    private String mapboxKey;

    @Value("${GOOGLE_KEY}")
    private String googleKey;

    @Value("${SPOON_KEY}")
    private String spoonKey;


    @RequestMapping({"/", "/recipes", "/restaurants", "/login", "/home","/register","/account", "/users", "/creators"})
    public String showValue() {
        return "forward:/index.html";
    }


//    for deployment
@RequestMapping(path = "/js/keys.js", produces = "application/javascript")
@ResponseBody
public String apikey(){
    return String.format("export function returnGoogleKey(){\n" +
            "    return `%s`;\n" +
            "}\n" +
            "export function returnMapboxKey(){\n" +
            "    return `%s`\n" +
            "}\n" +
            "export function returnSpoonKey(){\n" +
            "    return `%s`\n" +
            "}", googleKey, mapboxKey, spoonKey);
}

}
