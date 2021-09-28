package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.recipes.Recipe;
import com.codeup.byteoptions.data.recipes.RecipesRepository;
import com.codeup.byteoptions.data.user.User;
import com.codeup.byteoptions.data.user.UsersRepository;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/recipes", headers = "Accept=application/json", produces = "application/json")
public class RecipesController {

    private final RecipesRepository recipesRepository;
    private final UsersRepository usersRepository;

    public RecipesController(RecipesRepository recipesRepository, UsersRepository usersRepository) {
        this.recipesRepository = recipesRepository;
        this.usersRepository = usersRepository;
    }

    @GetMapping()
    private List<Recipe> getRecipes(){
        return recipesRepository.findAll();
    }

    @PostMapping()
    private void addRecipe(@RequestBody Recipe newRecipe, OAuth2Authentication auth){


        newRecipe.getIngredients().setRecipe(newRecipe);
        newRecipe.getInstructions().setRecipe(newRecipe);
        newRecipe.getNutrition().setRecipe(newRecipe);

        String email = auth.getName();
        User user = usersRepository.findByEmail(email).get();
        user.addRecipe(newRecipe);

        recipesRepository.save(newRecipe);
    }



    @PostMapping("{id}")
    private void create(@PathVariable Long id){
        recipesRepository.save(new Recipe(id));
    }
}
