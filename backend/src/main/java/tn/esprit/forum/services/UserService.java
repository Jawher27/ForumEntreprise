package tn.esprit.forum.services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.dto.SignupRequestDTo;
import tn.esprit.forum.dto.UserDto;
import tn.esprit.forum.entities.Images;
import tn.esprit.forum.entities.User;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface UserService {
    User addUser(User user);
    User deleteUser(long id );
    List<User> getAllUser();
    User updateUser(User user);
    Boolean presentByEmail(String Email);
     UserDto signupClient (SignupRequestDTo signupRequestDTo);
    UserDto signupCompany(SignupRequestDTo signupRequestDTo);


    public UserDto signupAlumni(SignupRequestDTo signupRequestDTo)throws IOException ;

    public User getUserById(Long id);
   Images store(MultipartFile file) throws IOException;

   Images getImages(String id);

    public void setBanned(boolean banned) ;
    public User bindUser(Long id );
    public User disbindUser(Long id );
    public User getUserByEmail(String email);
    public UserDto AddAdmin(SignupRequestDTo signupRequestDTo);


}
