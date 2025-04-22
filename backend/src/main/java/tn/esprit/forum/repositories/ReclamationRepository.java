package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Reclamation;

public interface ReclamationRepository extends JpaRepository<Reclamation,Long> {
}
