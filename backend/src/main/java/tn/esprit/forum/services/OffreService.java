package tn.esprit.forum.services;

import tn.esprit.forum.entities.Enum.TypeOffre;
import tn.esprit.forum.entities.Offre;

import java.util.List;

public interface OffreService {
    Offre addOffre(Offre  offre , Long id);
    Offre updateOffre(Offre offre);
    void removeOffer (Long idOffre);
    List<Offre> retriveAllOffers();
    Offre retrieveOfferById (Long idOffre);
    List<Offre> getOffreByType(TypeOffre type);
    List<Offre> getSuggestedOffers(Long id);
    List<Offre> getOffersByUserId(Long id) ;






}
