package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Reservation;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    List<Reservation> findByUser_Id(Long user_id);
    List<Reservation> findByStand_PackTypePack(TypePack stand_pack_typePack);
}
