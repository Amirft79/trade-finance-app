package ir.doint.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class BopInfoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static BopInfo getBopInfoSample1() {
        return new BopInfo().id(1L);
    }

    public static BopInfo getBopInfoSample2() {
        return new BopInfo().id(2L);
    }

    public static BopInfo getBopInfoRandomSampleGenerator() {
        return new BopInfo().id(longCount.incrementAndGet());
    }
}
