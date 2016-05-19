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
        this.productRepository.save(new Product("ข้าวฮาง",100,"P001",20,1.0,1,"ข้าวน้ำนมที่มีระยะแก่เกินจะทำข้าวเม่า แต่ยังไม่สุกพอระยะเก็บเกี่ยวหรือระยะพลับพลึง(รวงแก่ประมาณ 80%) นำข้าวเปลือกมาแช่น้ำและนำข้าวเปลือกไปนึ่งก่อนที่จะนำมาสีเป็นข้าวกล้อง ข้าวฮางทำได้ทั้งข้าวเจ้าและข้าวเหนียว","084-371-7844","มาจากชาวเขาชนเผ่าปกาเกอะญอ"));
        this.productRepository.save(new Product("ข้าวกล้องดอย",50,"P002",20,1.0,1,"ข้าวกล้องดอยคือข้าวที่กระเทาะเปลือกออกเพียงอย่างเดียวเท่านั้น ไม่ผ่านการขัดสี เมล็ดข้าวจะมีสีขุ่นเป็นข้าวที่มีจมูกข้าวและเยื้อหุ้มเมล็ดข้าวติดอยู่มาก ซึ่งเป็นส่วนที่มีคุณค่าทางอาหารและเป็นประโยชน์ต่อร่างกาย มีวิตามินบี 1 สูง","084-371-7844","มาจากชาวเขาชนเผ่าปกาเกอะญอ"));
        this.productRepository.save(new Product("ข้าวขาว",40,"P003",20,1.0,1,"ข้าวขาวคือข้าวที่ทำการขัดสีแล้ว มีเมล็ดที่อ่อนนุ่มเหมาะแก่การทำข้าวสวย","084-371-7844","มาจากชาวเขาชนเผ่าปกาเกอะญอ"));
        this.productRepository.save(new Product("หญ้าหวาน",70,"P004",20,0.05,1,"หญ้าหวานคือหญ้าที่ให้ความหวานแทนน้ำตาล เหมาะสำหรับผู้ป่วยที่เป็นโรคเบาหวาน","089-798-1808","มาจากชาวบ้านอมลอง"));
        this.productRepository.save(new Product("กล้วยแดง",50,"P005",20,0.4,1,"กล้วยทอดแบ่งเป็น สองประเภท กล้วยแดงและกล้วยเหลืองซึ่งแตกต่างกันจากวัตถูดิบในการผลิต เป็นกล้วยออแกนิคจากธรรมชาติ","084-371-7844","มาจากชุมชมอมลอง, อังคาย, ยั้งเมิน"));
        this.productRepository.save(new Product("กล้วยเหลือง",50,"P006",20,0.4,1,"กล้วยทอดแบ่งเป็น สองประเภท กล้วยแดงและกล้วยเหลืองซึ่งแตกต่างกันจากวัตถูดิบในการผลิ ตเป็นกล้วยออแกนิคจากธรรมชาติ","084-371-7844","มาจากชุมชมอมลอง, อังคาย, ยั้งเมิน"));
        this.productRepository.save(new Product("สบู่เหลวขมิ้น",50,"P007",20,0.4,1,"สบู่ธรรมชาติทำมาจากขมิ้น","084-371-7844","มาจากบ้านอมลอง"));
        /*this.productRepository.save(new Product("Product H",20,"P008",16,2.5,1,"This is product H","081-111-1111","This is from village H"));
        this.productRepository.save(new Product("Product I",10,"P009",29,0.75,1,"This is product I","081-111-1111","This is from village I"));
        this.productRepository.save(new Product("Product J",5,"P010",50,0.25,1,"This is product J","081-111-1111","This is from village J"));*/
    }
}
