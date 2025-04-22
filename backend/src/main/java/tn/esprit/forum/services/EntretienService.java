package tn.esprit.forum.services;

import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.entities.Entretien;
import tn.esprit.forum.entities.Enum.EtatCondidature;

import java.util.List;

public interface EntretienService {
    Entretien addEntretient (Entretien entretien, long idcon , EtatCondidature etatCondidature);
    void removeEntretient (long idEntretient);
    Entretien updateEntretient (Entretien entretien);
    List<Entretien> readAll();

}
