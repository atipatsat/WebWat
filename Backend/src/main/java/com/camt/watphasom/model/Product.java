package com.camt.watphasom.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Product implements Serializable {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private double price;
    private String code;
    private int stock;
    private double weight;
    private int status;
    private String description;
    private String contact;
    private String source;


    @OneToMany(mappedBy = "product")
    private Set<Picture> pictures;

    @OneToMany(mappedBy = "product")
    private Set<Review> reviews = new HashSet<>();

    /*Constructor*/

    public Product() {
    }

    public Product(String name, double price, String code, int stock, double weight, int status, String description, String contact, String source) {
        this.name = name;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.weight = weight;
        this.status = status;
        this.description = description;
        this.contact = contact;
        this.source = source;
    }

    /*Getter Setter*/
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Set<Picture> getPictures() {
        return pictures;
    }

    public void setPictures(Set<Picture> pictures) {
        this.pictures = pictures;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }
}
