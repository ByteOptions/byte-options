package com.codeup.byteoptions.data.recipes.instructions;


import com.codeup.byteoptions.data.recipes.Recipe;

import javax.persistence.*;

@Entity
@Table(name="instructions")
public class Instructions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Recipe recipe;

    @Column(columnDefinition = "json")
    private String instructionsJson;

    public Instructions(){
    }

    public Instructions(String instructionsJson) {
        this.instructionsJson = instructionsJson;
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

    public String getInstructionsJson() {
        return instructionsJson;
    }

    public void setInstructionsJson(String instructionsJson) {
        this.instructionsJson = instructionsJson;
    }
}
