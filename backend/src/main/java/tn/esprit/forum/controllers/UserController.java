package tn.esprit.forum.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.json.JSONException;
import org.json.JSONObject;
import org.postgresql.plugin.AuthenticationRequestType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.dto.AuthenticationRequest;
import tn.esprit.forum.dto.LoginRequest;
import tn.esprit.forum.dto.SignupRequestDTo;
import tn.esprit.forum.dto.UserDto;
import tn.esprit.forum.entities.Enum.Role;
import tn.esprit.forum.entities.Images;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.ImagesRepo;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.UserService;
import tn.esprit.forum.services.jwt.UserDetailsServiceImpl;
import tn.esprit.forum.utill.jwtUtill;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("user/")
public class UserController {
    private final UserService userService;
    @Autowired
    private ImagesRepo imageRepository;

    @Autowired
    AuthenticationManager authenticationManager;

@Autowired
    private UserDetailsServiceImpl userDetailsService;
@Autowired
private jwtUtill jwtutill;
@Autowired
private UserRepository userRepository;
@Autowired

    @PostMapping("add")
    public User addUser(@RequestBody User inscrit) {
        return userService.addUser(inscrit);
    }

    @DeleteMapping("delete/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
    }
    @GetMapping("allUser")
    List<User> users(){
        return userService.getAllUser();
    }
    @PutMapping("updateUser")
    User UpdateUser(@RequestBody User user){
        return userService.updateUser(user );
}

   public static final String Token_PREFIX ="Bearer";
    public static final String HEADER_STRING="Authorization";

    @PostMapping("upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            // Initialize the AWS SDK and S3 client
            // Define the desired file name (you can modify this as needed)
            String desiredFileName = "my-file-" + System.currentTimeMillis() + "-" + file.getOriginalFilename();

            // Convert the MultipartFile to a byte array
            byte[] fileBytes = file.getBytes();
            // Get the currently logged-in user
            // Store the file in the database
            userService.store(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body((message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body((message));
        }
    }

    @PostMapping ("Company/signup")
    public ResponseEntity<?> signupCompany (@RequestBody SignupRequestDTo signupRequestDTo){
       if (userService.presentByEmail(signupRequestDTo.getEmail())){
           return new ResponseEntity<>("Client already exists with this email!!" , HttpStatus.NOT_ACCEPTABLE);
       }
      // signupRequestDTo.setRole(Role.valueOf("Student"));
       UserDto createdUser = userService.signupCompany(signupRequestDTo);
       return new ResponseEntity<>(createdUser,HttpStatus.OK);
    }
    @PostMapping ("Client/signup")
    public ResponseEntity<?> signupClient(@RequestBody SignupRequestDTo signupRequestDTo){
        if (userService.presentByEmail(signupRequestDTo.getEmail())){
            return new ResponseEntity<>("Client already exists with this email!!" , HttpStatus.NOT_ACCEPTABLE);
        }
       // signupRequestDTo.setRole(Role.valueOf("EXPOSANT"));

        UserDto createdUser = userService.signupClient(signupRequestDTo);
        return new ResponseEntity<>(createdUser,HttpStatus.OK);
    }

    @PostMapping ("addAdmin")
    public ResponseEntity<?> addAdmin(@RequestBody SignupRequestDTo signupRequestDTo){
        if (userService.presentByEmail(signupRequestDTo.getEmail())){
            return new ResponseEntity<>("Admin already exists with this email!!" , HttpStatus.NOT_ACCEPTABLE);
        }


        UserDto createdUser = userService.AddAdmin(signupRequestDTo);
        return new ResponseEntity<>(createdUser,HttpStatus.OK);
    }






    @PostMapping ("Alumni/signupp")
    public ResponseEntity<?> signupAlumni(@RequestParam("picture") MultipartFile picture, @RequestBody SignupRequestDTo signupRequestDTo) throws IOException {
        if (userService.presentByEmail(signupRequestDTo.getEmail())){
            return new ResponseEntity<>("Client already exists with this email!!" , HttpStatus.NOT_ACCEPTABLE);
        }
       // signupRequestDTo.setPicture(picture.getBytes());
        UserDto createdUser = userService.signupAlumni(signupRequestDTo);
        return new ResponseEntity<>(createdUser,HttpStatus.OK);
    }




    @PostMapping("authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        String message = String.format("User authenticated Email: %s Password: %s",
                authenticationRequest.getEmail(),
                authenticationRequest.getPassword());
        log.info(message);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword())
            );
            log.info("Generating JWT token...");
            final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
            final String jwt = jwtutill.generateToken(userDetails);

            log.info("JWT token generated successfully!");
            // Check if the user is banned
            Optional<User> optionalUser = userRepository.findByEmail(authenticationRequest.getEmail());
            if (optionalUser.isPresent() && optionalUser.get().isBanned()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "This user is banned"));
            }

            // Wrap the JWT token in a JSON object
            return ResponseEntity.ok().body(Map.of("token", jwt));
        } catch (BadCredentialsException e) {
            String errorMessage;
            if (e.getMessage().toLowerCase().contains("password")) {
                errorMessage = "Incorrect password";
            } else {
                errorMessage = "Incorrect email";
            }

            // Wrap the error message in a JSON object
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", errorMessage));
        }
    }

@PutMapping("ban/{id}")
    public ResponseEntity<?> banUser(@PathVariable("id") Long id) {
     //  userService.bindUser(id);
       if (userService.getUserById(id) == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        else
           userService.bindUser(id);


        return new ResponseEntity<>("User banned successfully", HttpStatus.OK);
    }
    @PutMapping("Disban/{id}")
    public ResponseEntity<?> DisbanUser(@PathVariable("id") Long id) {
        //  userService.bindUser(id);
        if (userService.getUserById(id) == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        else
            userService.disbindUser(id);


        return new ResponseEntity<>("User banned successfully", HttpStatus.OK);
    }
    @GetMapping ("Email/{email}")

    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        if (userService.getUserByEmail(email) == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.OK);
    }
    @PostMapping("signout")
    public void signOut(HttpServletRequest request) {
        SecurityContextHolder.getContext().setAuthentication(null);
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
}





