package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Pack;
import tn.esprit.forum.entities.Stand;
import tn.esprit.forum.repositories.PackRepository;
import tn.esprit.forum.repositories.StandRepository;
import tn.esprit.forum.services.PackService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PackServiceImp implements PackService {
    private final PackRepository packRepository;
    private final StandRepository standRepository;

    @Override
    public Pack addPack(Pack pack) {
        return packRepository.save(pack);
    }

    @Override
    public Pack updatePack(Pack pack, Long id) {
        Optional<Pack> existingPackOptional = packRepository.findById(id);
        if (existingPackOptional.isPresent()) {
            // Mettre à jour les détails du forum existant avec les données fournies
            Pack existingPack = existingPackOptional.get();
            existingPack.setTypePack(pack.getTypePack());
            existingPack.setDescription(pack.getDescription());
            existingPack.setNbPlace(pack.getNbPlace());
            existingPack.setMontant(pack.getMontant());
            return packRepository.save(existingPack);
        } else {
            throw new NotFoundException("Pack not found with id: " + id);
        }
    }

    @Override
    public List<Pack> getAllPack() {
        return  packRepository.findAll();
    }

    @Override
    public Pack findById(Long id) {
        return packRepository.findById(id).orElse(null);
    }

    @Override
    public void deletePack(Long id) {
        packRepository.deleteById(id);
    }

    @Override
    public Pack findBtType(TypePack typePack) {
        return packRepository.findByTypePack(typePack);
    }

    @Override
    public void AffectePackToStand(TypePack type, Long idStand) {
        Pack p = packRepository.findByTypePack(type);
        Stand stand = standRepository.findById(idStand).orElse(null);

        if (p != null && stand != null) {
            // Mettre à jour la relation côté pack
            if (p.getStands() == null) {
                List<Stand> stands = new ArrayList<>();
                stands.add(stand);
                p.setStands(stands);
            } else {
                p.getStands().add(stand);
            }

            // Mettre à jour la relation côté stand
            stand.setPack(p);

            // Sauvegarder les entités
            packRepository.save(p);
            standRepository.save(stand);
        }
    }

}
