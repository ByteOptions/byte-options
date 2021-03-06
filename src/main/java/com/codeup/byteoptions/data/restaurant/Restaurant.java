package com.codeup.byteoptions.data.restaurant;

import javax.persistence.*;

@Entity
@Table(name="restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String vicinity;

    @Column(nullable = false)
    private String placeId;

    public Restaurant(Long id, String name, String vicinity, String placeId) {
        this.id = id;
        this.name = name;
        this.vicinity = vicinity;
        this.placeId = placeId;
    }

    public Restaurant(){
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

    public String getVicinity() {
        return vicinity;
    }

    public void setVicinity(String vicinity) {
        this.vicinity = vicinity;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }
}
