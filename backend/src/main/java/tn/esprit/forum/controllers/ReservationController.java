package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Reservation;
import tn.esprit.forum.services.ReservationService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("reservation")
public class ReservationController {
    private final ReservationService reservationService;
    @PostMapping("/add/{id}/{idStand}")
    void addReservation(@PathVariable("id")Long idU,@PathVariable("idStand") Long idStand){
        reservationService.addReservation(idU,idStand);
    }
   /* @PutMapping("/update/{idReservation}")
    void updateReservation(@RequestBody Reservation reservation,@PathVariable("idReservation")Long id)
    {
        reservationService.updateReservation(reservation,id);
    }*/
    @DeleteMapping("/delete/{idReservation}")
    void deleteReservation(@PathVariable("idReservation")Long id){
        reservationService.deleteReservation(id);
    }
    @GetMapping("/all")
    List<Reservation> readAll(){
        return reservationService.getAllReservation();
    }
    @GetMapping("/findUser/{id}")
    List<Reservation>  findUser(@PathVariable("id")Long id){
       return reservationService.findUser(id);
    }

    @GetMapping("/find/{typePack}")
    List<Reservation>  findByTypePack(@PathVariable("typePack") TypePack typePack){
        return reservationService.findByTypePack(typePack);
    }

}
