package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.recipes.Recipe;
import com.codeup.byteoptions.data.recipes.RecipesRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/recipes", headers = "Accept=application/json")
public class RecipesController {

    private final RecipesRepository recipesRepository;

    public RecipesController(RecipesRepository recipesRepository) {
        this.recipesRepository = recipesRepository;
    }

    @PostMapping
    private void create(@RequestBody Recipe recipe){
        recipesRepository.save(recipe);
    }
}
