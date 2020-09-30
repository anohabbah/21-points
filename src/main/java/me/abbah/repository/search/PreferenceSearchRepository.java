package me.abbah.repository.search;

import me.abbah.domain.Preference;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Preference} entity.
 */
public interface PreferenceSearchRepository extends ElasticsearchRepository<Preference, Long> {
}
