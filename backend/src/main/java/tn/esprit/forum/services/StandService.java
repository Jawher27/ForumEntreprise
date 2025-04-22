package tn.esprit.forum.services;

import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Stand;

import java.util.List;

public interface StandService {
    Stand addStand(Stand stand);

    Stand updateStand(Stand stand,Long id);

    List<Stand> getAllStand();

    Stand findById(Long id);

    void deleteStand(Long id);
    List<Stand> findByPack(TypePack typePack);

}
