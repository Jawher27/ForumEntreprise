package tn.esprit.forum.services;

import tn.esprit.forum.entities.Announcement;
import tn.esprit.forum.entities.TypeAnnonce;

import java.util.List;

public interface TypeAnnoceService {
    TypeAnnonce ajouterType(TypeAnnonce typeAnnonce);

    TypeAnnonce updateTypeAnnonce(TypeAnnonce typeAnnonce);

    List<TypeAnnonce> findAll();

    TypeAnnonce findById(long numTypeAnnonce);

    void delete(long numTypeAnnonce);

    public TypeAnnonce findByType(String lib);
}
