package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.user.User;
import com.codeup.byteoptions.data.user.UsersRepository;
import com.codeup.byteoptions.data.video.Video;
import com.codeup.byteoptions.data.video.VideoRepository;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/videos", headers = "Accept=application/json", produces = "application/json")
public class VideoController {

    private final VideoRepository videoRepository;
    private final UsersRepository usersRepository;

    public VideoController(VideoRepository videoRepository, UsersRepository usersRepository){
        this.videoRepository = videoRepository;
        this.usersRepository = usersRepository;
    }

    @PostMapping
    private void saveVideo(@RequestBody Video video, OAuth2Authentication auth){
        System.out.println(video.getTitle());
        System.out.println(video.getVideoID());
        String email = auth.getName();
        User user = usersRepository.findByEmail(email).get();
        user.addVideo(video);
        videoRepository.save(video);
    }

    @DeleteMapping("{id}")
    private void deleteVideo(@PathVariable Long id){
        System.out.println("The Id deleted was " + id);
        videoRepository.deleteById(id);
    }
}
