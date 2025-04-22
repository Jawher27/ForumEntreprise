package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.entities.Announcement;
import tn.esprit.forum.entities.TypeAnnonce;
import tn.esprit.forum.repositories.AnnouncementRepository;
import tn.esprit.forum.repositories.TypeAnnoceRepository;
import tn.esprit.forum.services.TypeAnnoceService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeAnnonceServiceImp implements TypeAnnoceService {
    private final TypeAnnoceRepository typeAnnoceRepository;
    private final AnnouncementRepository announcementRepository;
    @Override
    public TypeAnnonce ajouterType(TypeAnnonce typeAnnonce) {
        return typeAnnoceRepository.save(typeAnnonce);

    }

    @Override
    public TypeAnnonce updateTypeAnnonce(TypeAnnonce typeAnnonce) {
        return typeAnnoceRepository.save(typeAnnonce);
    }

    @Override
    public List<TypeAnnonce> findAll() {
        return (List<TypeAnnonce>)typeAnnoceRepository.findAll();
    }

    @Override
    public TypeAnnonce findById(long numTypeAnnonce) {
        return typeAnnoceRepository.findById(numTypeAnnonce).orElse(null);
    }
    @Override
    public TypeAnnonce findByType(String lib) {
        return typeAnnoceRepository.findByLibelle(lib);
    }
    @Override
    public void delete(long numTypeAnnonce) {
        typeAnnoceRepository.deleteById(numTypeAnnonce );
    }


}
