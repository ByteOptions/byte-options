package com.codeup.byteoptions.data.youtube;

import javax.persistence.*;

@Entity
@Table(name="videos")
public class Youtube {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String videoID;

    @Column(nullable = false)
    private String title;

    public Youtube(Long id, String videoID, String title) {
        this.id = id;
        this.videoID = videoID;
        this.title = title;
    }

    public Youtube(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVideoID() {
        return videoID;
    }

    public void setVideoID(String videoID) {
        this.videoID = videoID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
