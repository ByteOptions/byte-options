package com.codeup.byteoptions.data.recipes.nutrition;

import com.codeup.byteoptions.data.recipes.Recipe;

import javax.persistence.*;

@Entity
@Table(name="nutrition")
public class Nutrition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Recipe recipe;

    @Column(columnDefinition = "json")
    private String nutritionJson;

    public Nutrition(){
    }

    public Nutrition(String nutritionJson) {
        this.nutritionJson = nutritionJson;
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

    public String getNutritionJson() {
        return nutritionJson;
    }

    public void setNutritionJson(String nutritionJson) {
        this.nutritionJson = nutritionJson;
    }
}
