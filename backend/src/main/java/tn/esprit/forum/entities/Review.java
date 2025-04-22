package tn.esprit.forum.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idReview;
    Integer rating;
    String comment;
    @ManyToOne // na7ina l cascade bch ki nfaskhou l review ma yetfasa5ch l user
    User user;

    @ManyToOne
    Offre offre;
}
