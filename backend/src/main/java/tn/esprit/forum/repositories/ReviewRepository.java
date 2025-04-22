package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Review;

public interface ReviewRepository extends JpaRepository<Review,Long> {
}
