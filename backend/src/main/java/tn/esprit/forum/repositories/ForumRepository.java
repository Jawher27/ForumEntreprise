package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Forum;

import java.time.LocalDate;

public interface ForumRepository extends JpaRepository<Forum,Long> {
    Forum findFirstByDateForumAfterOrderByDateForumAsc(LocalDate currentDate);
}
