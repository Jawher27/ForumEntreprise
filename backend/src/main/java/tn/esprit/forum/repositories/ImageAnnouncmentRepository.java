package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.ImageAnnouncment;

public interface ImageAnnouncmentRepository extends JpaRepository<ImageAnnouncment, Long> {
}