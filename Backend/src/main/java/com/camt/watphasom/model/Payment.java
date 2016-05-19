package com.camt.watphasom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Payment {
    @Id
    @GeneratedValue
    private long id;
    private double paid;
    private double change;
    private String method;

    @JsonIgnore
    @OneToOne
    private ProductOrder productOrder;

    /*Constructor*/

    public Payment() {
    }

    public Payment(double paid, double change, String method) {
        this.paid = paid;
        this.change = change;
        this.method = method;
    }
    /*Getter Setter*/
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getPaid() {
        return paid;
    }

    public void setPaid(double paid) {
        this.paid = paid;
    }

    public double getChange() {
        return change;
    }

    public void setChange(double change) {
        this.change = change;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public ProductOrder getProductOrder() {
        return productOrder;
    }

    public void setProductOrder(ProductOrder productOrder) {
        this.productOrder = productOrder;
    }
}
