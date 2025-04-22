package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.entities.Entretien;
import tn.esprit.forum.entities.Enum.EtatCondidature;
import tn.esprit.forum.repositories.CondidatureRepository;
import tn.esprit.forum.repositories.EntretienRepository;
import tn.esprit.forum.services.EntretienService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntretienServiceImp implements EntretienService {
    private final EntretienRepository entretienRepository;
    private final CondidatureRepository condidatureRepository;
    @Override
    public Entretien addEntretient(Entretien entretien, long idcon, EtatCondidature etatCondidature) {

        return entretienRepository.save(entretien);
    }

    @Override
    public void removeEntretient(long idEntretient) {
        entretienRepository.deleteById(idEntretient);

    }

    @Override
    public Entretien updateEntretient(Entretien entretien) {
        return  entretienRepository.save(entretien);
    }

    @Override
    public List<Entretien> readAll() {
        return entretienRepository.findAll();
    }


}
