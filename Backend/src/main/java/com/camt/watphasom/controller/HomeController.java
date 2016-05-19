package com.camt.watphasom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/")
public class HomeController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/login")
    public String login() {
        return "index";
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public String upload(){

        return "upload";
    }

}
