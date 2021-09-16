package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.recipes.Recipe;
import com.codeup.byteoptions.data.recipes.RecipesRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/recipes", headers = "Accept=application/json", produces = "application/json")
public class RecipesController {

    private final RecipesRepository recipesRepository;

    public RecipesController(RecipesRepository recipesRepository) {
        this.recipesRepository = recipesRepository;
    }

    @GetMapping()
    private List<Recipe> getRecipes(){
        return recipesRepository.findAll();
    }
    @PostMapping()
    private void addRecipe(@RequestBody Recipe newRecipe){
        recipesRepository.save(newRecipe);
    }

    @PostMapping("{id}")
    private void create(@PathVariable Long id){
        recipesRepository.save(new Recipe(id));
    }
}
