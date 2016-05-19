package com.camt.watphasom.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
public class Admin {
    @Id
    @GeneratedValue
    private long id;
    private String email;
//    @JsonIgnore
    private String password;

    public Admin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Admin(){}

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
