package tn.esprit.forum.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TypeAnnonce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idType;
    String libelle;

    @JsonIgnore
    @OneToMany(mappedBy = "typeAnnonce", cascade = CascadeType.ALL)
    List<Announcement> announcements;
}
