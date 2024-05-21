package ir.doint.repository;

import ir.doint.domain.BopInfo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BopInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BopInfoRepository extends JpaRepository<BopInfo, Long> {}
