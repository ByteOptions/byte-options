package com.codeup.byteoptions.data.intolerance;

import javax.persistence.*;

@Entity
@Table(name="intolerance")
public class Intolerance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String name;

    public Intolerance(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Intolerance(){
    }

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

