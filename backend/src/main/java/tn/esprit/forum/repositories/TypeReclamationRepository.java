package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.TypeReclamation;

public interface TypeReclamationRepository extends JpaRepository<TypeReclamation,Long> {
}
