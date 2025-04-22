package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.repositories.TypeReclamationRepository;
import tn.esprit.forum.services.TypeReclamationService;
@Service
@RequiredArgsConstructor
public class TypeReclamationServiceImp implements TypeReclamationService {
    private final TypeReclamationRepository typeReclamationRepository;
}
