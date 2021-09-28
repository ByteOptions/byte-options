package com.codeup.byteoptions.data.user;

import com.codeup.byteoptions.data.preference.Preference;
import com.codeup.byteoptions.data.intolerance.Intolerance;
import com.codeup.byteoptions.data.recipes.Recipe;
import com.codeup.byteoptions.data.restaurant.Restaurant;
import com.codeup.byteoptions.data.video.Video;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.codeup.byteoptions.data.recipes.Recipe;
import com.codeup.byteoptions.data.restaurant.Restaurant;
import com.codeup.byteoptions.data.video.Video;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.Collection;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Email
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column
    private Role role = Role.USER;
    public enum Role {USER, ADMIN};

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH},
            targetEntity = Restaurant.class)
    @JoinTable(
            name="user_restaurants",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="restaurant_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    private Collection<Restaurant>restaurants;


    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH},
            targetEntity = Recipe.class)
    @JoinTable(
            name="user_recipe",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="recipe_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

                private Collection<Recipe>recipes;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH},
            targetEntity = Video.class)
    @JoinTable(
            name="user_videos",
            joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="video_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

                private Collection<Video>videos;


    public User(Long id, String username, String email, String password,
                Collection<Restaurant> restaurants, Collection<Recipe> recipes,
                Collection<Video> videos) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.restaurants = restaurants;
        this.recipes=recipes;
        this.videos = videos;
    }

    public User(){
    }

    public User (String username){
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void addRestaurants(Restaurant restaurant){
        restaurants.add(restaurant);
    }

    public Collection<Restaurant> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(Collection<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public Collection<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(Collection<Recipe> recipes) {
        this.recipes = recipes;
    }

    public void addRecipe(Recipe recipe){
        recipes.add(recipe);
    }

    public void deleteRecipe(Long id){
        System.out.println(id);
        recipes.removeIf(r -> (r.getId().equals(id)));
        for (Recipe recipe : recipes){
            System.out.println(recipe.getId());
        }
    }
    public void deleteRestaurant(Long id){
        restaurants.removeIf(r -> (r.getId().equals(id)));
    }
    public void deleteVideo(Long id){
        videos.removeIf(r -> (r.getId().equals(id)));
    }

    public Collection<Video> getVideos() {
        return videos;
    }

    public void setVideos(Collection<Video> videos) {
        this.videos = videos;
    }

    public void addVideo(Video video){
        videos.add(video);
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

