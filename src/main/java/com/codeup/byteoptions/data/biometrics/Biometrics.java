package com.codeup.byteoptions.data.biometrics;

import javax.persistence.*;

@Entity
@Table(name = "biometrics")
public class Biometrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private Long height;

    @Column(nullable = true)
    private Long weight;

    @Column(nullable = true)
    private String gender;

    public Biometrics(Long id, Long height, Long weight, String gender) {
        this.id = id;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
    }

    public Biometrics() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
};

