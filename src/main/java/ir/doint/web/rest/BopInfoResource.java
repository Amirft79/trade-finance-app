package ir.doint.web.rest;

import ir.doint.domain.BopInfo;
import ir.doint.repository.BopInfoRepository;
import ir.doint.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ir.doint.domain.BopInfo}.
 */
@RestController
@RequestMapping("/api/bop-infos")
@Transactional
public class BopInfoResource {

    private final Logger log = LoggerFactory.getLogger(BopInfoResource.class);

    private static final String ENTITY_NAME = "bopInfoBopInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BopInfoRepository bopInfoRepository;

    public BopInfoResource(BopInfoRepository bopInfoRepository) {
        this.bopInfoRepository = bopInfoRepository;
    }

    /**
     * {@code POST  /bop-infos} : Create a new bopInfo.
     *
     * @param bopInfo the bopInfo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bopInfo, or with status {@code 400 (Bad Request)} if the bopInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BopInfo> createBopInfo(@RequestBody BopInfo bopInfo) throws URISyntaxException {
        log.debug("REST request to save BopInfo : {}", bopInfo);
        if (bopInfo.getId() != null) {
            throw new BadRequestAlertException("A new bopInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        bopInfo = bopInfoRepository.save(bopInfo);
        return ResponseEntity.created(new URI("/api/bop-infos/" + bopInfo.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, bopInfo.getId().toString()))
            .body(bopInfo);
    }

    /**
     * {@code GET  /bop-infos} : get all the bopInfos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bopInfos in body.
     */
    @GetMapping("")
    public List<BopInfo> getAllBopInfos() {
        log.debug("REST request to get all BopInfos");
        return bopInfoRepository.findAll();
    }

    /**
     * {@code GET  /bop-infos/:id} : get the "id" bopInfo.
     *
     * @param id the id of the bopInfo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bopInfo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BopInfo> getBopInfo(@PathVariable("id") Long id) {
        log.debug("REST request to get BopInfo : {}", id);
        Optional<BopInfo> bopInfo = bopInfoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bopInfo);
    }

    /**
     * {@code DELETE  /bop-infos/:id} : delete the "id" bopInfo.
     *
     * @param id the id of the bopInfo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBopInfo(@PathVariable("id") Long id) {
        log.debug("REST request to delete BopInfo : {}", id);
        bopInfoRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
