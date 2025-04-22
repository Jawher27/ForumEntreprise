package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Entretien;
import tn.esprit.forum.entities.User;

public interface EntretienRepository extends JpaRepository<Entretien,Long> {
}
