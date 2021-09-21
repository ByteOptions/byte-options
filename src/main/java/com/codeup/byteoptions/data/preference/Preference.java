package com.codeup.byteoptions.data.preference;

import com.codeup.byteoptions.data.intolerance.Intolerance;
import com.codeup.byteoptions.data.preference.diet.Diet;
import com.codeup.byteoptions.data.user.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Table(name="preference")
public class Preference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties({"posts", "password"})
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    private Diet diet;

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST, CascadeType.REFRESH},
            targetEntity = Intolerance.class)
    @JoinTable(
            name="preference_intolerance",
            joinColumns = {@JoinColumn(name = "preference_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="intolerance_id", nullable = false, updatable = false)},
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT)
    )

    private Collection<Intolerance>intolerances;

    public Preference(Long id, User user, Collection<Intolerance> intolerances) {
        this.id = id;
        this.user = user;
        this.intolerances = intolerances;
    }



    public Preference(Long id) {
        this.id = id;
    }

    public Preference(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
       this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Collection<Intolerance> getIntolerances() {
        return intolerances;
    }

    public void setIntolerances(Collection<Intolerance> intolerances) {
        this.intolerances = intolerances;
    }

    public Diet getDiet() {
        return diet;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }
}
