package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Pack;

public interface PackRepository extends JpaRepository<Pack,Long> {
    Pack findByTypePack(TypePack typePack);

}
