package com.camt.watphasom.controller;

import com.camt.watphasom.model.Customer;
import com.camt.watphasom.repository.CustomerRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerRespository customerRespository;

    @RequestMapping(value = "/")
    public Iterable<Customer> index() {
        return customerRespository.findAll();
//        return "index";
    }

    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public Customer authenticate(@RequestBody Customer customer) {
        if (customer.getEmail().equals("") && customer.getPassword().equals("")) {
            return null;
        } else {
            Customer check = customerRespository.findByEmail(customer.getEmail());
            if (check != null) {
                if(check.getPassword().equals(customer.getPassword())){
                    return check;
                }
                return null;
            }
        }
        return null;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Customer add(@RequestBody Customer customer) {
        if (customer.getEmail().equals("") && customer.getPassword().equals("")) {
            return null;
        } else {
            Customer check = customerRespository.findByEmail(customer.getEmail());
            if (check == null) {
//                Customer newCustomer = new Customer(username, password);
                customerRespository.save(customer);
                return customer;
            }
        }
        return null;
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Customer edit(@RequestBody Customer customer) {
        Customer oldCustomer = customerRespository.findOne(customer.getId());
        if(!customer.getEmail().equals("")){
            oldCustomer.setEmail(customer.getEmail());
        }
        if(!customer.getPassword().equals("")){
            oldCustomer.setPassword(customer.getPassword());
        }
        customerRespository.save(customer);
        return oldCustomer;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public boolean delete(@RequestBody Customer customer) {
        try {
            customerRespository.delete(customer.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
