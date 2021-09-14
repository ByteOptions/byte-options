package com.codeup.byteoptions.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/youtubes", headers = "Accept=application/json", produces = "application/json")
public class YoutubeController {

}
