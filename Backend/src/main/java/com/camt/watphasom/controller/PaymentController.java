package com.camt.watphasom.controller;

import com.camt.watphasom.model.Customer;
import com.camt.watphasom.model.Payment;
import com.camt.watphasom.repository.CustomerRespository;
import com.camt.watphasom.repository.PaymentRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentRespository paymentRespository;

    @RequestMapping(value = "/")
    public Iterable<Payment> index() {
        return paymentRespository.findAll();
//        return "index";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Payment add(@RequestBody Payment obj) {
        try{
            paymentRespository.save(obj);
            return obj;
        }catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Payment edit(@RequestBody Payment obj) {
        try{
            paymentRespository.save(obj);
            return obj;
        }catch(Exception e){
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public boolean delete(@RequestBody Payment obj) {
        try {
            paymentRespository.delete(obj.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
