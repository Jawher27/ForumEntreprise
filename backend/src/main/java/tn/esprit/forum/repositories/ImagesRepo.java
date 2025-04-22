package tn.esprit.forum.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.entities.Images;


import java.io.IOException;
 @Repository
public interface ImagesRepo extends JpaRepository<Images, String> {

}
