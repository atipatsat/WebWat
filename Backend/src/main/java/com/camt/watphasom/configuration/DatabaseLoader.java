package com.camt.watphasom.configuration;

import com.camt.watphasom.model.Admin;
import com.camt.watphasom.model.Customer;
import com.camt.watphasom.model.Product;
import com.camt.watphasom.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final AdminRespository adminRespository;
    private final CustomerRespository customerRespository;
    private final ProductOrderRespository orderRepository;
    private final PaymentRespository paymentRepository;
    private final PictureRespository pictureRepository;
    private final ProductRespository productRepository;
    private final ReviewRespository reviewRepository;

    @Autowired
    public DatabaseLoader(AdminRespository adminRespository
            , CustomerRespository customerRespository
            , ProductOrderRespository orderRepository
            , PaymentRespository paymentRepository
            , PictureRespository pictureRepository
            , ProductRespository productRepository
            , ReviewRespository reviewRepository) {
        this.adminRespository = adminRespository;
        this.customerRespository = customerRespository;
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.pictureRepository = pictureRepository;
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.adminRespository.save(new Admin("admin@a.com", "1234"));

        Customer customer = new Customer("user1@a.com", "1234", 1);
        this.customerRespository.save(customer);
        this.customerRespository.save(new Customer("user2@a.com", "1234", 1));
        this.customerRespository.save(new Customer("user3@a.com", "1234", 1));
        this.customerRespository.save(new Customer("user4@a.com", "1234", 2));
        this.customerRespository.save(new Customer("user5@a.com", "1234", 2));

        this.productSetUp();
    }

    public void productSetUp(){
        this.productRepository.save(new Product("Product A",100,"P001",10,1,1,"This is product A","081-111-1111","This is from village A"));
        this.productRepository.save(new Product("Product B",50,"P002",10,3,1,"This is product B","081-111-1111","This is from village B"));
        this.productRepository.save(new Product("Product C",20,"P003",15,0.5,1,"This is product C","081-111-1111","This is from village C"));
        this.productRepository.save(new Product("Product D",65,"P004",20,0.75,1,"This is product D","081-111-1111","This is from village D"));
        this.productRepository.save(new Product("Product E",80,"P005",10,1.25,1,"This is product E","081-111-1111","This is from village E"));
        this.productRepository.save(new Product("Product F",150,"P006",5,0.5,1,"This is product F","081-111-1111","This is from village F"));
        this.productRepository.save(new Product("Product G",99,"P007",30,1,1,"This is product G","081-111-1111","This is from village G"));
        this.productRepository.save(new Product("Product H",20,"P008",16,2.5,1,"This is product H","081-111-1111","This is from village H"));
        this.productRepository.save(new Product("Product I",10,"P009",29,0.75,1,"This is product I","081-111-1111","This is from village I"));
        this.productRepository.save(new Product("Product J",5,"P010",50,0.25,1,"This is product J","081-111-1111","This is from village J"));
    }
}
