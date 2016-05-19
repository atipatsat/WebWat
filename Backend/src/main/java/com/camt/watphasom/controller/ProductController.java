package com.camt.watphasom.controller;

import com.camt.watphasom.model.Product;
import com.camt.watphasom.repository.ProductRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductRespository productRespository;

    @RequestMapping(value = "/")
    public Iterable<Product> index() {
        return productRespository.findAll();
//        return "index";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Product add(@RequestBody Product obj) {
        try{
            productRespository.save(obj);
            return obj;
        }catch(Exception e){
            System.out.print(e.getMessage());
            return null;
        }
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Product edit(@RequestBody Product obj) {
        try{
            productRespository.save(obj);
            return obj;
        }catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public boolean delete(@RequestBody Product obj) {
        try {
            productRespository.delete(obj.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
