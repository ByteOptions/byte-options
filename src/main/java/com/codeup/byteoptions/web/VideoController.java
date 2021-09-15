package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.video.Video;
import com.codeup.byteoptions.data.video.VideoRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/videos", headers = "Accept=application/json", produces = "application/json")
public class VideoController {

    private final VideoRepository videoRepository;

    public VideoController(VideoRepository videoRepository){
        this.videoRepository = videoRepository;
    }

    @PostMapping
    private void saveVideo(@RequestBody Video video){
        System.out.println(video.getTitle());
        System.out.println(video.getVideoID());
        videoRepository.save(video);
    }

    @DeleteMapping("{id}")
    private void deleteVideo(@PathVariable Long id){
        System.out.println("The Id deleted was " + id);
        videoRepository.deleteById(id);
    }
}
