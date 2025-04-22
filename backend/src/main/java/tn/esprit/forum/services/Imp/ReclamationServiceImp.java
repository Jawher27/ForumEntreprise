package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.repositories.ReclamationRepository;
import tn.esprit.forum.services.ReclamationService;

@Service
@RequiredArgsConstructor
public class ReclamationServiceImp implements ReclamationService {
    private final ReclamationRepository reclamationRepository;
}
