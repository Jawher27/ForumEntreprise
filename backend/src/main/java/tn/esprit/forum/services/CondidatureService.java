package tn.esprit.forum.services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.entities.Condidature;

import java.io.IOException;
import java.util.List;

public interface CondidatureService {
   // Condidature addCondidature (Condidature condidature, MultipartFile cvFile, MultipartFile coverLetterFile, Long idO, Long idU);

    Condidature ajouterCondidatureAvecFichiers(String etatCondidature, Long offreId, Long userId,
                                               MultipartFile coverLetter, MultipartFile cv) throws IOException;
    void removeCondidature (long idCondidature);

    Condidature updateCondidature (Condidature condidature);
    Condidature updateEtatCondidature (Long idCondidature,Condidature updtcondidature);
    List<Condidature> readAll();

    public Condidature getCondidatureById(Long candidatureId) ;
    List<Condidature> findAllConditaturesByIdOffre(Long id_Offre);

    List<Condidature> findAllConditaturesByIdUser(Long id_User);

    List<Condidature> findAllConditaturesByIdUserAndIdOffre(Long id_User,  Long idOffre);

}
