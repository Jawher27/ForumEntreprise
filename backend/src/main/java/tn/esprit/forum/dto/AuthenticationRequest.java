package tn.esprit.forum.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {
     String email;
     String password;
}
