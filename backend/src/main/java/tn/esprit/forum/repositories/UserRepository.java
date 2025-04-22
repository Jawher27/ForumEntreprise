package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.forum.dto.SignupRequestDTo;
import tn.esprit.forum.dto.UserDto;
import tn.esprit.forum.entities.User;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByEmail(String email);;

        User findByCin (String cin);
    }






