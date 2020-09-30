package me.abbah.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import me.abbah.web.rest.TestUtil;

public class PointTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Point.class);
        Point point1 = new Point();
        point1.setId(1L);
        Point point2 = new Point();
        point2.setId(point1.getId());
        assertThat(point1).isEqualTo(point2);
        point2.setId(2L);
        assertThat(point1).isNotEqualTo(point2);
        point1.setId(null);
        assertThat(point1).isNotEqualTo(point2);
    }
}
