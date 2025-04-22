package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.entities.Entretien;
import tn.esprit.forum.entities.Enum.EtatCondidature;
import tn.esprit.forum.entities.Offre;
import tn.esprit.forum.repositories.CondidatureRepository;
import tn.esprit.forum.services.EntretienService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("entretien")
public class EntretienController {
    private final EntretienService entretienService;
    private final CondidatureRepository condidatureRepository;
    @PostMapping("add/{idcondidature}/{EtatCondidature}")
    public Entretien addEntretient(@RequestBody Entretien entretien,@PathVariable ("idcondidature") long idcon, @PathVariable ("EtatCondidature") EtatCondidature etatcondidature) {
        Condidature C=condidatureRepository .findById(idcon).orElse(null);
        return entretienService.addEntretient(entretien,idcon,etatcondidature);
    }

    @PutMapping
    public  Entretien updateEntrerien(@RequestBody Entretien entretien){

        return entretienService.updateEntretient(entretien);
    }
    @DeleteMapping("{idEntretient}")
    public boolean removeEntretient(@PathVariable long idEntretient ) {

        entretienService.removeEntretient(idEntretient);
        return true;
    }
    @GetMapping("/all")
    public List<Entretien> readALL()
    {
        return entretienService.readAll();
    }

}
