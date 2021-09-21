package com.codeup.byteoptions.web;

import com.codeup.byteoptions.data.preference.diet.Diet;
import com.codeup.byteoptions.data.preference.diet.DietRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/diets", headers = "Accept=application/json", produces = "application/json")
public class DietController {

    private final DietRepository dietRepository;


    public DietController(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }

    @GetMapping()
    private List<Diet> getDiets(){
        return dietRepository.findAll();
    }

    @GetMapping("/{id}")
    private Diet getDietById(@PathVariable Long id){
        return dietRepository.getById(id);
    }

    @PostMapping()
    private void addDiet(@RequestBody Diet newDiet){
        dietRepository.save(newDiet);
    }



}
