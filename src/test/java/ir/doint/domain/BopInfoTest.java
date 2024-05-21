package ir.doint.domain;

import static ir.doint.domain.BopInfoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ir.doint.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BopInfoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BopInfo.class);
        BopInfo bopInfo1 = getBopInfoSample1();
        BopInfo bopInfo2 = new BopInfo();
        assertThat(bopInfo1).isNotEqualTo(bopInfo2);

        bopInfo2.setId(bopInfo1.getId());
        assertThat(bopInfo1).isEqualTo(bopInfo2);

        bopInfo2 = getBopInfoSample2();
        assertThat(bopInfo1).isNotEqualTo(bopInfo2);
    }

    @Test
    void hashCodeVerifier() throws Exception {
        BopInfo bopInfo = new BopInfo();
        assertThat(bopInfo.hashCode()).isZero();

        BopInfo bopInfo1 = getBopInfoSample1();
        bopInfo.setId(bopInfo1.getId());
        assertThat(bopInfo).hasSameHashCodeAs(bopInfo1);
    }
}
