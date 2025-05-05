package tn.esprit.forum.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import tn.esprit.forum.entities.Enum.EtatCondidature;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Condidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idCondidature;

    String refCondidature;

    @Enumerated(EnumType.STRING)
    EtatCondidature etatCondidature;


    @Lob
    @Basic(fetch = FetchType.LAZY)
    @JdbcTypeCode(SqlTypes.BINARY)
    @Column(name = "cover_letter")
    @JsonIgnore
    private byte[] coverLetter;


    @Lob
    @Basic(fetch = FetchType.LAZY)
    @JdbcTypeCode(SqlTypes.BINARY)
    @Column(name = "cv")
    @JsonIgnore
    private byte[] cv;           // URL stockée dans MinIO

    @ManyToOne(cascade = CascadeType.ALL)
    Entretien entretien;

    @ManyToOne
    //@JsonIgnore
    Offre offre;

    @ManyToOne(cascade = CascadeType.ALL)
    User user;

}
