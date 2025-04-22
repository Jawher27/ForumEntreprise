package tn.esprit.forum.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.forum.entities.Enum.TypePack;

import java.util.List;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Pack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idPack;
    @Enumerated(EnumType.STRING)
    TypePack typePack;
    double montant;
    String description;
    int nbPlace;




    @OneToMany(mappedBy = "pack")
    @JsonBackReference
    private List<Stand> stands;

}
