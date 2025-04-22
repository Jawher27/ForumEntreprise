package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Facture;

public interface FactureRepository extends JpaRepository<Facture,Long> {
}
