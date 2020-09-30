package me.abbah.repository.search;

import me.abbah.domain.Weight;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Weight} entity.
 */
public interface WeightSearchRepository extends ElasticsearchRepository<Weight, Long> {
}
