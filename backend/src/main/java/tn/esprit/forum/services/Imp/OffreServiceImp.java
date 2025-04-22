package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.entities.Enum.Role;
import tn.esprit.forum.entities.Enum.TypeOffre;
import tn.esprit.forum.entities.Offre;
import tn.esprit.forum.entities.Review;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.OffreRepository;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.OffreService;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OffreServiceImp implements OffreService {
    private final OffreRepository offreRepository;
    private final UserRepository userRepository;

    @Override
    public Offre addOffre(Offre offre , Long id) {
        User user   = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("no User found with this id " + id)) ;
        offre.setUser(user);
        offreRepository.save(offre);
        return offreRepository.save(offre);
    }

    @Override
    public Offre updateOffre(Offre offre) {
        return offreRepository.save(offre);
    }

    @Override
    public void removeOffer(Long idOffre) {
        offreRepository.deleteById(idOffre);
        System.out.println("Role: Student");

    }

    @Override
    public List<Offre> retriveAllOffers() {
        return offreRepository.findAll();
    }

    @Override
    public Offre retrieveOfferById(Long idOffre) {
        return offreRepository.findById(idOffre).orElse(null);
    }

    @Override
    public List<Offre> getOffreByType(TypeOffre typeOffre) {
        return offreRepository.findOffreByTypeOffre(typeOffre);
    }

    @Override
    public List<Offre> getSuggestedOffers(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return Collections.emptyList();
        }
        // String userRole = user.getRole().toString();
        if (user.getRole() == Role.Student) {
            System.out.println("Role: Student");
            List<Offre> suggestedOffers = offreRepository.findOffreByTypeOffreIn(Arrays.asList(TypeOffre.STAGE_PFE, TypeOffre.STAGE_ETE));
            System.out.println("Suggested Offers: " + suggestedOffers);
            return suggestedOffers;
        }

        if (user.getRole()== Role.ALUMNI)
        {
            return offreRepository.findOffreByTypeOffre(TypeOffre.OFFRE_EMPLOI );

        }
        if (user.getRole()== Role.EXPOSANT)
        {
            System.out.println("Role: Student");
            List<Offre> suggestedOffers = offreRepository.findOffreByTypeOffreIn(Arrays.asList(TypeOffre.OFFRE_EMPLOI,TypeOffre.STAGE_PFE, TypeOffre.STAGE_ETE));
            System.out.println("Suggested Offers: " + suggestedOffers);
            return suggestedOffers;
        }




        return null;

    }

    public List<Offre> getOffersByUserId(Long id) {
        return offreRepository.findByUserId(id);
    }
}
