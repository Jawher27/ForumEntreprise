package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.repositories.SponsorRepository;
import tn.esprit.forum.services.SponsorService;
@Service
@RequiredArgsConstructor
public class SponsorServiceImp implements SponsorService {
    private final SponsorRepository sponsorRepository;
}
