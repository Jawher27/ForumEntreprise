package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Announcement;

import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement,Long> {
    List<Announcement> findByTypeAnnonceLibelle(String typeAnnonce_libelle);
    List<Announcement> findByTypeAnnonceIdType(Long typeAnnonce_idType);
    List<Announcement> findByTypeAnnonce_Libelle(String typeAnnonce_libelle);
    List<Announcement> findByUserId(Long user_id);



}
