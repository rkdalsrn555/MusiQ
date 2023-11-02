package com.a608.musiq.global.scheduler;


import java.util.Date;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {
    @Scheduled(cron = "*/10 * * * * *")
    public void printDate(){
        System.out.println(new Date());
    }
}
