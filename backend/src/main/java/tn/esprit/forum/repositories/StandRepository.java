package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Stand;

import java.util.List;

public interface StandRepository extends JpaRepository<Stand,Long> {
    Stand findByNumero(int numero);
    List<Stand> findByPack_TypePack(TypePack pack_typePack);

}
