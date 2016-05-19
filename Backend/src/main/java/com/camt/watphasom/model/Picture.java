package com.camt.watphasom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Picture {
    @Id
    @GeneratedValue
    private long id;
    private String name;
    private String path;

    @JsonIgnore
    @ManyToOne
    private Product product;

    /*Constructor*/

    public Picture() {
    }

    public Picture(String name, String path) {
        this.id = id;
        this.name = name;
        this.path = path;
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

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
