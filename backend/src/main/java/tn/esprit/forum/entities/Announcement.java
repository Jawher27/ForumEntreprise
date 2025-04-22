package tn.esprit.forum.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long id;
    String announcementName;
    double articlePrice;
//    @OneToOne(mappedBy = "announcement")
//    private ImageAnnouncment imageAnnouncments;

    String articlePicture;
    Boolean valid;
    int quantity;

    @JsonIgnore
    @ManyToOne
    User user;
    @JsonIgnore
    @ManyToOne
    TypeAnnonce typeAnnonce;
    @OneToOne(cascade = CascadeType.ALL)
    Facture facture;

}
