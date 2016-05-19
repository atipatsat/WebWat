package com.camt.watphasom.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Review {
    @Id
    @GeneratedValue
    private long id;
    private String text;
    private int score;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Product product;

    /*Constructor*/

    public Review() {
    }

    public Review(int id, String text, int score) {
        this.id = id;
        this.text = text;
        this.score = score;
    }

    /*Getter Setter*/
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
