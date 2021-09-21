package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.intolerance.Intolerance;
import com.codeup.byteoptions.data.intolerance.IntoleranceRepository;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "api/intolerance", headers = "Accept=application/json", produces = "application/json")
public class IntoleranceController {

    private final IntoleranceRepository intoleranceRepository;

    public IntoleranceController(IntoleranceRepository intoleranceRepository) {
        this.intoleranceRepository = intoleranceRepository;
    }

    @GetMapping("{id}")
    private Intolerance getIntoleranceById(@PathVariable Long id){
        return intoleranceRepository.findById(id).get();
    }
}
