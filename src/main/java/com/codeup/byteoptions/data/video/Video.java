package com.codeup.byteoptions.data.video;

import javax.persistence.*;

@Entity
@Table(name="videos")
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String videoID;

    @Column(nullable = false)
    private String title;

    public Video(Long id, String videoID, String title) {
        this.id = id;
        this.videoID = videoID;
        this.title = title;
    }

    public Video(){
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
