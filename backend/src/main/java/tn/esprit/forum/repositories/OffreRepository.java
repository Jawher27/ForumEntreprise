package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.forum.entities.Enum.TypeOffre;
import tn.esprit.forum.entities.Offre;
import tn.esprit.forum.entities.User;

import java.util.List;

public interface OffreRepository extends JpaRepository<Offre,Long> {
    @Query("SELECT o FROM Offre o WHERE o.typeOffre IN :types")
    List<Offre> findOffreByTypeOffreIn(@Param("types") List<TypeOffre> types);
    List<Offre> findOffreByTypeOffre(TypeOffre typeOffre);
    List<Offre> findByTypeOffre(TypeOffre typeOffre);
    List<Offre> findByUserId(Long id);

}
