package com.codeup.byteoptions.data.preference;

import javax.persistence.*;


@Entity
@Table(name="preference")
public class Preference {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    public Preference(Long id) {
        Id = id;
    }

    public Preference(){
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }
}
