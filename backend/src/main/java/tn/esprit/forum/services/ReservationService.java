package tn.esprit.forum.services;

import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Reservation;

import java.util.List;

public interface ReservationService {

    Reservation addReservation(Long idU,Long idStand);

    Reservation updateReservation(Reservation reservation,Long id);

    List<Reservation> getAllReservation();

    Reservation findById(Long id);

    void deleteReservation(Long id);

    List<Reservation>  findUser(Long id);
    List<Reservation> findByTypePack(TypePack typePack);

}
