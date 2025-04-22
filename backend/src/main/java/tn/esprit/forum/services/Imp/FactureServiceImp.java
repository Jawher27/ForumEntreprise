package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.repositories.FactureRepository;
import tn.esprit.forum.services.FactureService;
@Service
@RequiredArgsConstructor
public class FactureServiceImp implements FactureService {
    private final FactureRepository factureRepository;
}
