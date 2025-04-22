package tn.esprit.forum.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idSponsor;
    String firstName;
    String picture;
    String email;
    int phoneNumber;
    String subject;
    String message;
    String linkProfile;
    Boolean Valid;
    @ManyToOne
    @JsonIgnore
    User user;



}
