package tn.esprit.forum.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Type;
import org.springframework.stereotype.Component;
import tn.esprit.forum.dto.UserDto;
import tn.esprit.forum.entities.Enum.Role;

import java.util.Base64;
import java.util.List;

@Entity
@Component
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "forum_user") // Specify the table name to avoid conflict with reserved keyword "user"
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long id;
    int cin;
    String firstName;
    String lastName;
     boolean banned;


   // String picture;
    @Enumerated(EnumType.STRING)
    Role role;
    String email;
    int phoneNumber;
    String password;
    String cv;



    @OneToMany(mappedBy = "user")
    List<Announcement> announcements;
    @ManyToMany(mappedBy = "users")
    List<Reclamation> reclamations;
    @OneToMany(mappedBy = "user")
    List<Sponsor> sponsors;

    @OneToMany(mappedBy = "user")
    List<Forum> forum;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    List<Reservation> reservations;



    public UserDto getDto(){
        UserDto userDto=new UserDto();
        userDto.setId(id);
        userDto.setCin(cin);
        userDto.setCv(cv);
        userDto.setEmail(email);

        userDto.setPassword(password);
        //userDto.setPicture(picture);
        userDto.setFirstName(firstName);
        userDto.setLastName(lastName);
        userDto.setPhoneNumber(phoneNumber);
      return userDto;
    }

}
