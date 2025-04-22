package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.TypeAnnonce;

public interface TypeAnnoceRepository extends JpaRepository<TypeAnnonce,Long> {
    TypeAnnonce findByLibelle(String libelle);
}
