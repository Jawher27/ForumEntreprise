package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Sponsor;

public interface SponsorRepository extends JpaRepository<Sponsor,Long> {
}
