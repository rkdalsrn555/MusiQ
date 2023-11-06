package com.a608.musiq.global;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class Util {

    private final RedisTemplate<String, String> redisTemplate;
    public enum RedisKey {
        RANKING("expranking");

        private final String key;

        RedisKey(String key) {
            this.key = key;
        }

        public String getKey() {
            return key;
        }
    }

    /**
     * 한 사용자의 랭킹을 조회하는 메서드
     * @param key
     * @param member
     * @return sortedSet에서의 사용자의 랭크
     */
    public Long getRankFromRedisSortedSet(String key, String member) {
        ZSetOperations<String, String> zSetOps = redisTemplate.opsForZSet();
        zSetOps.
        return zSetOps.reverseRank(key, member);
    }

    /**
     * 입력 범위의 랭킹 정보를 반환하는 메서드
     * @param key
     * @param start
     * @param end
     * @return Set<TypedTuple<String>> - 입력받은 범위 내의 데이터 Set
     */
    public Set<ZSetOperations.TypedTuple<String>> getRangeFromRedisSortedSet(String key, long start, long end) {
        ZSetOperations<String, String> zSetOps = redisTemplate.opsForZSet();
        return zSetOps.reverseRangeWithScores(key, start, end);
    }

    /**
     * 해당 키의 value들을 모두 삭제
     * @param key
     */
    public void deleteKeyInRedis(String key) {
        redisTemplate.delete(key);
    }

    /**
     * SortedSet에 데이터를 삽입하는 method
     * @param member
     * @param score
     */
    public void insertDatatoRedisSortedSet(String key, String member, double score) {
        ZSetOperations<String, String> zSetOps = redisTemplate.opsForZSet();
        zSetOps.add(key, member, score);
    }

}
