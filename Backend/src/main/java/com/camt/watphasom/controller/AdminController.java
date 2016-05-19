package com.camt.watphasom.controller;

import com.camt.watphasom.model.Admin;
import com.camt.watphasom.repository.AdminRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminRespository adminRespository;

    @RequestMapping(value = "/")
    public Iterable<Admin> index() {
        return adminRespository.findAll();
//        return "index";
    }

    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public boolean authenticate(@RequestBody Admin admin) {
        if (admin.getEmail().equals("") && admin.getPassword().equals("")) {
            return false;
        } else {
            Admin check = adminRespository.findByEmail(admin.getEmail());
            if (check != null) {
                if(check.getPassword().equals(admin.getPassword())){
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Admin add(@RequestBody Admin admin) {
        if (admin.getEmail().equals("") && admin.getPassword().equals("")) {
            return null;
        } else {
            Admin check = adminRespository.findByEmail(admin.getEmail());
            if (check == null) {
//                Admin newAdmin = new Admin(username, password);
                adminRespository.save(admin);
                return admin;
            }
        }
        return null;
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public Admin edit(@RequestBody Admin admin) {
        Admin oldAdmin = adminRespository.findOne(admin.getId());
        if(!admin.getEmail().equals("")){
            oldAdmin.setEmail(admin.getEmail());
        }
        if(!admin.getPassword().equals("")){
            oldAdmin.setPassword(admin.getPassword());
        }
        adminRespository.save(admin);
        return oldAdmin;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public boolean delete(@RequestBody Admin admin) {
        try {
            adminRespository.delete(admin.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
