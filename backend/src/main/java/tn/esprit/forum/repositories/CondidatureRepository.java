package tn.esprit.forum.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.entities.User;

import java.util.List;

@Repository
public interface CondidatureRepository extends JpaRepository<Condidature,Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT into condidature SET cover_letter = :coverLetter, cv = :cv ", nativeQuery = true)
    void updateFiles( @Param("coverLetter") byte[] coverLetter, @Param("cv") byte[] cv);
    List<Condidature> findByOffre_IdOffreOrderByIdCondidatureAsc(Long idOffre);

    List<Condidature> findByUser_IdOrderByIdCondidatureAsc(Long id);

    List<Condidature> findByUser_IdAndOffre_IdOffreOrderByIdCondidatureAsc(Long id, Long idOffre);

}
