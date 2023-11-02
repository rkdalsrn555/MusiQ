package com.a608.musiq.global.scheduler;


<<<<<<< HEAD
import com.a608.musiq.global.Util;
import lombok.RequiredArgsConstructor;
=======
import java.util.Date;
>>>>>>> 7a5aa9184498041657228723e0e03c24351d9cd0
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Scheduler {
    private final Util util;

    // 매일 새벽 4시 0분 0초마다 실행됨
    @Scheduled(cron = "0 0 4 * * *")
    private void deleteRanking(){
        // util에 deleteRankingInRedis 메서드 구현하면 됨
        util.deleteRankingInRedis();
    }

    // 매일 새벽 4시 0분 1초마다 실행됨
    @Scheduled(cron = "1 0 4 * * *")
    private void insertRanking(){
        // util에 insertRankingInRedis 메서드 구현하면 됨
        util.insertRankingInRedis();
    }

}
