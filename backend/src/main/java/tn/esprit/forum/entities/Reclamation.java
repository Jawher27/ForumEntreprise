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
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long idReclamation;
    String Message;

    @ManyToOne
    @JsonIgnore
    TypeReclamation typeReclamation;
    @ManyToMany
    @JsonIgnore
    List<User> users;
}
