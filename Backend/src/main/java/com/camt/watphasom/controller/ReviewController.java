package com.camt.watphasom.controller;

import com.camt.watphasom.model.Review;
import com.camt.watphasom.repository.ReviewRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewRespository reviewRespository;

    @RequestMapping(value = "/")
    public Iterable<Review> index() {
        return reviewRespository.findAll();
//        return "index";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Review add(@RequestBody Review obj) {
        try{
            reviewRespository.save(obj);
            return obj;
        }catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Review edit(@RequestBody Review obj) {
        try{
            reviewRespository.save(obj);
            return obj;
        }catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public boolean delete(@RequestBody Review obj) {
        try {
            reviewRespository.delete(obj.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
