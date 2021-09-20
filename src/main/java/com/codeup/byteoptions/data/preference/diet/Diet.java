package com.codeup.byteoptions.data.preference.diet;

import javax.persistence.*;

@Entity
@Table(name="diet")
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;


    public Diet(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Diet(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
