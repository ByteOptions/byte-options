package com.codeup.byteoptions.data.recipes;

import com.codeup.byteoptions.data.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table (name="recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private long recipeID;

    @ManyToOne
    @JsonIgnoreProperties({"password"})
    private User user;

    public Recipe() {
    }

    public long getId() {
        return id;
    }

    public long getRecipeID() {
        return recipeID;
    }

    public User getUser() {
        return user;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setRecipeID(long recipeID) {
        this.recipeID = recipeID;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
