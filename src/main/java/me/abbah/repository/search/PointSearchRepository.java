package me.abbah.repository.search;

import me.abbah.domain.Point;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Point} entity.
 */
public interface PointSearchRepository extends ElasticsearchRepository<Point, Long> {
}
