package com.camt.watphasom.controller;

import com.camt.watphasom.model.Customer;
import com.camt.watphasom.model.Payment;
import com.camt.watphasom.model.Picture;
import com.camt.watphasom.repository.PictureRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/picture")
public class PictureController {
    @Autowired
    private PictureRespository pictureRespository;

    @RequestMapping(value = "/")
    public Iterable<Picture> index() {
        return pictureRespository.findAll();
//        return "index";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Picture add(@RequestBody Picture obj) {
        try{
            pictureRespository.save(obj);
            return obj;
        }catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Picture edit(@RequestBody Picture obj) {
        try{
            pictureRespository.save(obj);
            return obj;
        }catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public boolean delete(@RequestBody Picture obj) {
        try {
            pictureRespository.delete(obj.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
