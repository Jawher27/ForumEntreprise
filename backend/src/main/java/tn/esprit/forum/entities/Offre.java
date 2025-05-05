package tn.esprit.forum.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.forum.entities.Enum.TypeOffre;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Offre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idOffre;

    String titre;


    @Column(columnDefinition = "TEXT")
    String Description;

    @Enumerated(EnumType.STRING)
    TypeOffre typeOffre;

    String periode;

    Date dateDebut;

    Date dateFin;

    String lieu;
    LocalDateTime dateCreation;

    @ManyToOne  // (cascade = CascadeType.ALL) // na7ina l cascade khater ki tfasakh offer yetfasa5 user maaha
    User user;


    @JsonIgnore
    @OneToMany(mappedBy = "offre")
    List<Condidature> condidatures;


    @JsonIgnore
    @OneToMany(mappedBy = "offre" , cascade = CascadeType.ALL) /// Zeda Cascade khater ki nfasakh offer ma tetfasakh ken ma nfasakh review
    List<Review> reviews;

}
