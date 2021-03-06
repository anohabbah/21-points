package me.abbah.web.rest;

import me.abbah.domain.Preference;
import me.abbah.repository.PreferenceRepository;
import me.abbah.repository.search.PreferenceSearchRepository;
import me.abbah.security.SecurityUtils;
import me.abbah.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link me.abbah.domain.Preference}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PreferenceResource {

    private final Logger log = LoggerFactory.getLogger(PreferenceResource.class);

    private static final String ENTITY_NAME = "preference";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PreferenceRepository preferenceRepository;

    private final PreferenceSearchRepository preferenceSearchRepository;

    public PreferenceResource(PreferenceRepository preferenceRepository, PreferenceSearchRepository preferenceSearchRepository) {
        this.preferenceRepository = preferenceRepository;
        this.preferenceSearchRepository = preferenceSearchRepository;
    }

    /**
     * {@code POST  /preferences} : Create a new preference.
     *
     * @param preference the preference to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new preference, or with status {@code 400 (Bad Request)} if the preference has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/preferences")
    public ResponseEntity<Preference> createPreference(@Valid @RequestBody Preference preference) throws URISyntaxException {
        log.debug("REST request to save Preference : {}", preference);
        if (preference.getId() != null) {
            throw new BadRequestAlertException("A new preference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Preference result = preferenceRepository.save(preference);
        preferenceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/preferences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /preferences} : Updates an existing preference.
     *
     * @param preference the preference to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated preference,
     * or with status {@code 400 (Bad Request)} if the preference is not valid,
     * or with status {@code 500 (Internal Server Error)} if the preference couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/preferences")
    public ResponseEntity<Preference> updatePreference(@Valid @RequestBody Preference preference) throws URISyntaxException {
        log.debug("REST request to update Preference : {}", preference);
        if (preference.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Preference result = preferenceRepository.save(preference);
        preferenceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, preference.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /preferences} : get all the preferences.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of preferences in body.
     */
    @GetMapping("/preferences")
    public ResponseEntity<List<Preference>> getAllPreferences(Pageable pageable) {
        log.debug("REST request to get a page of Preferences");
        Page<Preference> page = preferenceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /preferences/:id} : get the "id" preference.
     *
     * @param id the id of the preference to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the preference, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/preferences/{id}")
    public ResponseEntity<Preference> getPreference(@PathVariable Long id) {
        log.debug("REST request to get Preference : {}", id);
        Optional<Preference> preference = preferenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(preference);
    }

    /**
     * {@code DELETE  /preferences/:id} : delete the "id" preference.
     *
     * @param id the id of the preference to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/preferences/{id}")
    public ResponseEntity<Void> deletePreference(@PathVariable Long id) {
        log.debug("REST request to delete Preference : {}", id);
        preferenceRepository.deleteById(id);
        preferenceSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/preferences?query=:query} : search for the preference corresponding
     * to the query.
     *
     * @param query the query of the preference search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/preferences")
    public ResponseEntity<List<Preference>> searchPreferences(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Preferences for query {}", query);
        Page<Preference> page = preferenceSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }

    @GetMapping("/my-preferences")
    public ResponseEntity<Preference> getUserPreferences() {
        String username = SecurityUtils.getCurrentUserLogin().get();
        log.debug("REST request to get preferences : {}", username);

        Optional<Preference> preferences = this.preferenceRepository.findOneByUserLogin(username);

        if (preferences.isPresent()) {
            return new ResponseEntity<>(preferences.get(), HttpStatus.OK);
        }

        Preference defaultPreferences = new Preference()
            .weeklyGoal(10);
        return new ResponseEntity<>(defaultPreferences, HttpStatus.OK);
    }
}
