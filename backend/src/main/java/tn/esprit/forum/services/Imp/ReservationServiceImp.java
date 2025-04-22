package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Reservation;
import tn.esprit.forum.entities.Stand;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.PackRepository;
import tn.esprit.forum.repositories.ReservationRepository;
import tn.esprit.forum.repositories.StandRepository;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.ReservationService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImp implements ReservationService {
    private final ReservationRepository reservationRepository;

    private final UserRepository userRepository ;

    private final PackRepository packRepository ;
    private final StandRepository standRepository;

    @Override
    public Reservation addReservation(Long idU,Long idStand) {
        User user =userRepository.findById(idU).orElse(null);
        Stand stand=standRepository.findById(idStand).orElse(null);
if(user!=null ) {
    Reservation reservation = new Reservation();
    reservation.setUser(user);
    reservation.setStand(stand);
    stand.setDisponible(Boolean.FALSE);
    standRepository.save(stand);
    reservation.setDateReservation(LocalDateTime.now());
    return reservationRepository.save(reservation);
}
return null;
    }

    @Override
    public Reservation updateReservation(Reservation reservation, Long id) {
       /* Optional<Reservation> existingPackOptional = reservationRepository.findById(id);
        if (existingPackOptional.isPresent()) {
            // Mettre à jour les détails du forum existant avec les données fournies
            Reservation existingReser = existingPackOptional.get();
            existingReser.setDateReservation(reservation.getDateReservation());
            existingReser.setPack(reservation.getPack());
            existingReser.setUser(reservation.getUser());
            return reservationRepository.save(existingReser);
        } else {
            throw new NotFoundException("Reservation not found with id: " + id);
        }*/
        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> getAllReservation() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation findById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteReservation(Long id) {
reservationRepository.deleteById(id);
    }

    @Override
    public List<Reservation>  findUser(Long id) {
        return reservationRepository.findByUser_Id(id);
    }

    @Override
    public List<Reservation> findByTypePack(TypePack typePack) {
        return reservationRepository.findByStand_PackTypePack(typePack);
    }
}
