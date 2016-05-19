package com.camt.watphasom.controller;

import com.camt.watphasom.model.ProductOrder;
import com.camt.watphasom.repository.ProductOrderRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private ProductOrderRespository orderRespository;
    
    @RequestMapping(value = "/")
    public Iterable<ProductOrder> index() {
        return orderRespository.findAll();
//        return "index";
    }

    @RequestMapping(value = "/find-by-user")
    public Iterable<ProductOrder> findByUser(long id) {
        return orderRespository.findByCustomerId(id);
//        return "index";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ProductOrder add(@RequestBody ProductOrder order) {
        try{
            orderRespository.save(order);
            return order;
        }catch(Exception e){System.out.print(e.getMessage());return null;}
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ProductOrder edit(@RequestBody ProductOrder order) {
        try{
            orderRespository.save(order);
            return order;
        }catch(Exception e){return null;}
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public boolean delete(@RequestBody ProductOrder order) {
        try {
            orderRespository.delete(order.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
