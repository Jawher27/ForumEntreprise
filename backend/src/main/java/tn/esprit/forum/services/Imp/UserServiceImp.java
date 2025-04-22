package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.dto.SignupRequestDTo;
import tn.esprit.forum.dto.UserDto;
import tn.esprit.forum.entities.Enum.Role;
import tn.esprit.forum.entities.Images;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.ImagesRepo;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.UserService;
import tn.esprit.forum.services.jwt.JwtRequestFilter;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private ImagesRepo ImgRepository;


    @Override
    public User addUser(User user)
    {user.setBanned(false);
        return userRepository.save(user);
    }

    @Override
    public User deleteUser(long id) {
        userRepository.deleteById(id);
        return null;
    }
    public List<User> getAllUser() {
        return (List<User>) userRepository.findAll();}
    private boolean banned;

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    public UserDto signupClient(SignupRequestDTo signupRequestDTo){
        User user=new User();
        user.setFirstName(signupRequestDTo.getFirstName());
        user.setCin(signupRequestDTo.getCin());
        user.setLastName(signupRequestDTo.getLastName());
        user.setCv(signupRequestDTo.getCv());
        user.setEmail(signupRequestDTo.getEmail());
        user.setPhoneNumber(signupRequestDTo.getPhoneNumber());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTo.getPassword()));
       // user.setPicture(signupRequestDTo.getPicture());
        user.setRole(Role.Student);
        return userRepository.save(user).getDto();


    }

    @Override
    public UserDto signupCompany(SignupRequestDTo signupRequestDTo) {
        User user=new User();
        user.setFirstName(signupRequestDTo.getFirstName());
        user.setCin(signupRequestDTo.getCin());
        user.setLastName(signupRequestDTo.getLastName());
        user.setCv(signupRequestDTo.getCv());
        user.setEmail(signupRequestDTo.getEmail());
        user.setPhoneNumber(signupRequestDTo.getPhoneNumber());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTo.getPassword()));
       // user.setPicture(signupRequestDTo.getPicture());
        user.setRole(Role.EXPOSANT);
        return userRepository.save(user).getDto();}

   @Override
   public UserDto signupAlumni(SignupRequestDTo signupRequestDTo) {
     //  String fileName = StringUtils.cleanPath(file.getOriginalFilename());
       User user=new User();
       user.setFirstName(signupRequestDTo.getFirstName());
       user.setCin(signupRequestDTo.getCin());
       user.setLastName(signupRequestDTo.getLastName());
       user.setCv(signupRequestDTo.getCv());
       user.setEmail(signupRequestDTo.getEmail());
      // user.setPicture(signupRequestDTo.getPicture());
       user.setPhoneNumber(signupRequestDTo.getPhoneNumber());
       user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTo.getPassword()));
       user.setRole(Role.ALUMNI);
       return userRepository.save(user).getDto();
   }
    @Override
    public UserDto AddAdmin(SignupRequestDTo signupRequestDTo) {
        //  String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        User user=new User();
        user.setFirstName(signupRequestDTo.getFirstName());
        user.setCin(signupRequestDTo.getCin());
        user.setLastName(signupRequestDTo.getLastName());

        user.setEmail(signupRequestDTo.getEmail());

        user.setPhoneNumber(signupRequestDTo.getPhoneNumber());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequestDTo.getPassword()));
        user.setRole(Role.ADMINITRATOR);
        return userRepository.save(user).getDto();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }



    @Override
    public Images store(MultipartFile file) throws IOException {
        System.out.println("debut store");
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        // Get the currently logged in user
       // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       // System.out.println("authentication" + authentication.getName()   );

        Images img = new Images(fileName, file.getContentType(), file.getBytes());
       // String username = authentication.getName();
       // System.out.println("username" + username);

        // Retrieve the User object using the username
        //Optional<User> userOptional = userRepository.findByEmail(username);
       /* if (!userOptional.isPresent()) {
            System.out.println("User not found");
            throw new RuntimeException("User not found");
        }
        User user = userOptional.get();
        img.setUploader(user);*/

        return ImgRepository.save(img);
    }

    @Override
    public Images getImages(String id) {
        return ImgRepository.findById(id).orElse(null);
    }


    public void setBanned(boolean banned) {
        this.banned = banned;
    }


    @Override
    public Boolean presentByEmail(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        return userOptional.isPresent();
    }
    public User bindUser(Long id ){
         User user=userRepository.findById(id).orElse(null);
         user.setBanned(true);
            return userRepository.save(user);
    }

    @Override
    public User disbindUser(Long id) {
        User user=userRepository.findById(id).orElse(null);
        user.setBanned(false);
        return userRepository.save(user);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }


}
