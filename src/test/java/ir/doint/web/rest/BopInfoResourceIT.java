package ir.doint.web.rest;

import static ir.doint.domain.BopInfoAsserts.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import ir.doint.IntegrationTest;
import ir.doint.domain.BopInfo;
import ir.doint.repository.BopInfoRepository;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BopInfoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class BopInfoResourceIT {

    private static final String ENTITY_API_URL = "/api/bop-infos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BopInfoRepository bopInfoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBopInfoMockMvc;

    private BopInfo bopInfo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BopInfo createEntity(EntityManager em) {
        BopInfo bopInfo = new BopInfo();
        return bopInfo;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BopInfo createUpdatedEntity(EntityManager em) {
        BopInfo bopInfo = new BopInfo();
        return bopInfo;
    }

    @BeforeEach
    public void initTest() {
        bopInfo = createEntity(em);
    }

    @Test
    @Transactional
    void createBopInfo() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the BopInfo
        var returnedBopInfo = om.readValue(
            restBopInfoMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bopInfo)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BopInfo.class
        );

        // Validate the BopInfo in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertBopInfoUpdatableFieldsEquals(returnedBopInfo, getPersistedBopInfo(returnedBopInfo));
    }

    @Test
    @Transactional
    void createBopInfoWithExistingId() throws Exception {
        // Create the BopInfo with an existing ID
        bopInfo.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBopInfoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bopInfo)))
            .andExpect(status().isBadRequest());

        // Validate the BopInfo in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBopInfos() throws Exception {
        // Initialize the database
        bopInfoRepository.saveAndFlush(bopInfo);

        // Get all the bopInfoList
        restBopInfoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bopInfo.getId().intValue())));
    }

    @Test
    @Transactional
    void getBopInfo() throws Exception {
        // Initialize the database
        bopInfoRepository.saveAndFlush(bopInfo);

        // Get the bopInfo
        restBopInfoMockMvc
            .perform(get(ENTITY_API_URL_ID, bopInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bopInfo.getId().intValue()));
    }

    @Test
    @Transactional
    void getNonExistingBopInfo() throws Exception {
        // Get the bopInfo
        restBopInfoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void deleteBopInfo() throws Exception {
        // Initialize the database
        bopInfoRepository.saveAndFlush(bopInfo);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the bopInfo
        restBopInfoMockMvc
            .perform(delete(ENTITY_API_URL_ID, bopInfo.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return bopInfoRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected BopInfo getPersistedBopInfo(BopInfo bopInfo) {
        return bopInfoRepository.findById(bopInfo.getId()).orElseThrow();
    }

    protected void assertPersistedBopInfoToMatchAllProperties(BopInfo expectedBopInfo) {
        assertBopInfoAllPropertiesEquals(expectedBopInfo, getPersistedBopInfo(expectedBopInfo));
    }

    protected void assertPersistedBopInfoToMatchUpdatableProperties(BopInfo expectedBopInfo) {
        assertBopInfoAllUpdatablePropertiesEquals(expectedBopInfo, getPersistedBopInfo(expectedBopInfo));
    }
}
