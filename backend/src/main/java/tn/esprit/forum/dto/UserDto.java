package tn.esprit.forum.dto;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import tn.esprit.forum.entities.Enum.Role;
@Getter
@Setter
@Data
public class UserDto {

    Long id;
    int cin;
    String firstName;
    String lastName;

    String email;
    int phoneNumber;
    String password;
    String cv;




}
