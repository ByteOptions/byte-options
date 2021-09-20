package com.codeup.byteoptions.data.recipes.ingredients;

import com.codeup.byteoptions.data.recipes.Recipe;

import javax.persistence.*;

@Entity
@Table(name="ingredients")
public class Ingredients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Recipe recipe;

    @Column(columnDefinition = "json")
    private String ingredientsJson;

    public Ingredients(){
    }

    public Ingredients(String ingredientsJson) {
        this.ingredientsJson = ingredientsJson;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public String getIngredientsJson() {
        return ingredientsJson;
    }

    public void setIngredientsJson(String ingredientsJson) {
        this.ingredientsJson = ingredientsJson;
    }
}
