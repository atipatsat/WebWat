package com.camt.watphasom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
public class ProductOrder {
    @Id
    @GeneratedValue
    private long id;

    private String label;
    private String address;
    private int transportation;
    private int status;
    private double fee;
    private double price;
    private double weight;
    private double total;
    @Type(type="com.camt.watphasom.model.Product")
    private List<Product> items = new ArrayList<Product>();

//    @JsonIgnore
    @ManyToOne
    private Customer customer;

    @JsonIgnore
    @OneToOne(mappedBy = "productOrder")
    private Payment payment;

    /*Constructor*/

    public ProductOrder() {
    }

    public ProductOrder(String label, String address, int transportation, int status, double fee, double price, double weight, double total, List<Product> items) {
        this.label = label;
        this.address = address;
        this.transportation = transportation;
        this.status = status;
        this.fee = fee;
        this.price = price;
        this.weight = weight;
        this.total = total;
        this.items = items;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTransportation() {
        return transportation;
    }

    public void setTransportation(int transportation) {
        this.transportation = transportation;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public double getFee() {
        return fee;
    }

    public void setFee(double fee) {
        this.fee = fee;
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

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<Product> getItems() {
        return items;
    }

    public void setItems(List<Product> items) {
        this.items = items;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}
