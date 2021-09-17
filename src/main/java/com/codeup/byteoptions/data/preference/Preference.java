package com.codeup.byteoptions.data.preference;

import com.codeup.byteoptions.data.preference.diet.Diet;
import com.codeup.byteoptions.data.user.User;

import javax.persistence.*;


@Entity
@Table(name="preference")
public class Preference {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Diet diet;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;


    public Preference(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
       this.id = id;
    }

    public Diet getDiet() {
        return diet;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


}
