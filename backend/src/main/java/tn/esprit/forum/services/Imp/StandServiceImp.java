package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Stand;
import tn.esprit.forum.repositories.StandRepository;
import tn.esprit.forum.services.StandService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StandServiceImp implements StandService {
    private final StandRepository standRepository;

    @Override
    public Stand addStand(Stand stand) {
        return standRepository.save(stand);
    }

    @Override
    public Stand updateStand(Stand stand, Long id) {
        Optional<Stand> existingStandOptional = standRepository.findById(id);
        if (existingStandOptional.isPresent()) {
            // Mettre à jour les détails du forum existant avec les données fournies
            Stand existingStand = existingStandOptional.get();
            existingStand.setDisponible(stand.getDisponible());
            existingStand.setPack(stand.getPack());
            existingStand.setNumero(stand.getNumero());
            return standRepository.save(existingStand);
        } else {
            throw new NotFoundException("Stand not found with id: " + id);
        }
    }

    @Override
    public List<Stand> getAllStand() {
        return standRepository.findAll();
    }

    @Override
    public Stand findById(Long id) {
        return standRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteStand(Long id) {
        standRepository.deleteById(id);
    }

    @Override
    public List<Stand> findByPack(TypePack typePack) {
        return standRepository.findByPack_TypePack(typePack);
    }
}
