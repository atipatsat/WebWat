package com.camt.watphasom.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Customer {
    @Id
    @GeneratedValue
    private long id;

    private String email;
//    @JsonIgnore
    private String password;
    private int type;

    @OneToMany(mappedBy = "customer")
    private Set<ProductOrder> productOrders = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    private Set<Review> reviews = new HashSet<>();

    /*Constructor*/

    public Customer() {
    }

    public Customer(String email, String password, int type) {
        this.email = email;
        this.password = password;
        this.type = type;
    }

    /*Getter Setter*/
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Set<ProductOrder> getProductOrders() {
        return productOrders;
    }

    public void setProductOrders(Set<ProductOrder> productOrders) {
        this.productOrders = productOrders;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
}
