package tn.esprit.forum.services.Imp;

import io.minio.errors.MinioException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import tn.esprit.forum.configs.MinioService;
import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.entities.Enum.EtatCondidature;
import tn.esprit.forum.entities.Offre;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.CondidatureRepository;
import tn.esprit.forum.repositories.OffreRepository;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.CondidatureService;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CondidatureServiceImp implements CondidatureService {
    private final CondidatureRepository condidatureRepository;
    private final UserRepository userRepository;
    private final OffreRepository offreRepository;
    private final MinioService minioService;

   // private static final String UPLOAD_DIR = "C:/Users/abedj/OneDrive/Bureau/uploads/";

//    @Override
//    public Condidature addCondidature(Condidature condidature, MultipartFile cvFile, MultipartFile coverLetterFile, Long idO, Long idU) {
//
//        try {
//            // Upload du CV vers MinIO
//            String cvFileName = "cv_" + idU + "_" + cvFile.getOriginalFilename();
//            String cvFilePath = minioService.uploadFile(cvFile, cvFileName);
//            condidature.setCvUrl(cvFilePath);
//
//            // Upload de la lettre de motivation vers MinIO
//            String coverLetterFileName = "cover_letter_" + idU + "_" + coverLetterFile.getOriginalFilename();
//            String coverLetterFilePath = minioService.uploadFile(coverLetterFile, coverLetterFileName);
//            condidature.setCoverLetterUrl(coverLetterFilePath);
//
//
//
//            User u=userRepository.findById(idU).orElse(null);
//        Offre o=offreRepository.findById(idO).orElse(null);
//
//        condidature.setUser(u);
//        condidature.setOffre(o);
//        // userRepository.save(u);
//        //offreRepository.save(o);
//        return condidatureRepository.save(condidature);
//        } catch (Exception e) { // Log l'erreur et relancer une exception personnalisée ou retourner une réponse d'erreur
//            e.printStackTrace();
//            throw new RuntimeException("Erreur lors de l'ajout de la candidature : " + e.getMessage());
//        }
//    }

//    @Override
//    public Condidature addCondidature(Condidature condidature, MultipartFile cvFile, MultipartFile coverLetterFile, Long idO, Long idU) {
//        try {
//            User user = userRepository.findById(idU).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
//            Offre offre = offreRepository.findById(idO).orElseThrow(() -> new RuntimeException("Offre non trouvée"));
//
//            String cvFileName = "cv_" + idU + "_" + cvFile.getOriginalFilename();
//            String coverLetterFileName = "cover_letter_" + idU + "_" + coverLetterFile.getOriginalFilename();
//
//            condidature.setCvUrl(minioService.uploadFile(cvFile, cvFileName));
//            condidature.setCoverLetterUrl(minioService.uploadFile(coverLetterFile, coverLetterFileName));
//            condidature.setUser(user);
//            condidature.setOffre(offre);
//
//            return condidatureRepository.save(condidature);
//        } catch (Exception e) {
//            throw new RuntimeException("Erreur lors de l'ajout de la candidature : " + e.getMessage());
//        }
//    }

//    public Condidature ajouterCondidatureAvecFichiers(String etatCondidature, Long offreId, Long userId,
//                                                      MultipartFile coverLetter, MultipartFile cv) throws IOException {
//        // Vérifier si l'offre et l'utilisateur existent
//        Offre offre = offreRepository.findById(offreId).orElseThrow(() -> new RuntimeException("Offre non trouvée"));
//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
//
//        // Enregistrer les fichiers sur le serveur
//        String coverLetterPath = saveFile(coverLetter);
//        String cvPath = saveFile(cv);
//
//        // Créer l'entité Candidature
//        Condidature condidature = new Condidature();
//        condidature.setEtatCondidature(Enum.valueOf(EtatCondidature.class, etatCondidature));
//        condidature.setCoverLetterUrl(coverLetterPath);
//        condidature.setCvUrl(cvPath);
//        condidature.setOffre(offre);
//        condidature.setUser(user);
//
//        return condidatureRepository.save(condidature);
//    }
//
//    private String saveFile(MultipartFile file) throws IOException {
//        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//        Path filePath = Path.of(UPLOAD_DIR + "/"+fileName);
//
//        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
//
//        return filePath.toString();
//    }

    private static final String BUCKET_NAME = "candidatures";

    public Condidature ajouterCondidatureAvecFichiers(String etatCondidature, Long offreId, Long userId,
                                                      MultipartFile coverLetter, MultipartFile cv) throws IOException {

        if (coverLetter == null || coverLetter.isEmpty()) {
            throw new IllegalArgumentException("La lettre de motivation est requise");
        }
        if (cv == null || cv.isEmpty()) {
            throw new IllegalArgumentException("Le CV est requis");
        }
        // Vérifier si l'offre et l'utilisateur existent
        Offre offre = offreRepository.findById(offreId).orElseThrow(() -> new RuntimeException("Offre non trouvée"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));



        // Créer l'entité Candidature
        Condidature condidature = new Condidature();
        condidature.setEtatCondidature(Enum.valueOf(EtatCondidature.class, etatCondidature));
        condidature.setCoverLetter(coverLetter.getBytes());
        condidature.setCv(cv.getBytes());
        condidature.setOffre(offre);
        condidature.setUser(user);

        return condidatureRepository.save(condidature);
    }


    // Enregistrer les fichiers sur MinIO
//        String coverLetterUrl = uploadToMinio(coverLetter);
//        String cvUrl = uploadToMinio(cv);


    public Condidature getCondidatureById(Long candidatureId) {
        return condidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new EntityNotFoundException("Candidature avec ID " + candidatureId + " non trouvée"));
    }



//    @Override
//    public void uploadProfilePicture(int userId, MultipartFile file) throws IOException {
//        byte[] fileData = file.getBytes();
//        userRepository.updateProfilePicture(userId, fileData);
//    }

//    private String uploadToMinio(MultipartFile file) throws IOException {
//        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
//        try (InputStream inputStream = file.getInputStream()) {
//            minioService.uploadFile(BUCKET_NAME, fileName, inputStream, file.getContentType());
//        }
//        catch (MinioException | NoSuchAlgorithmException | InvalidKeyException e) {
//            throw new IOException("Erreur lors de l'upload vers MinIO", e);
//        }
//        return BUCKET_NAME + "/" + fileName;
//    }


    @Override
    public void removeCondidature(long idCondidature) {
        condidatureRepository.deleteById(idCondidature);
    }

    @Override
    public Condidature updateCondidature(Condidature condidature) {
        return condidatureRepository.save(condidature);
    }


    @Override
    public Condidature updateEtatCondidature(Long idCondidature,Condidature updtcondidature) {

        Condidature existingCondidature = condidatureRepository.findById(idCondidature)
                .orElseThrow(() -> new EntityNotFoundException("Condidature non trouvée avec l'ID :" + idCondidature));

        if (!Objects.equals(updtcondidature.getEtatCondidature(), existingCondidature.getEtatCondidature())){

            existingCondidature.setEtatCondidature(updtcondidature.getEtatCondidature());
        }
        return condidatureRepository.save(existingCondidature);



    }

    @Override
    public List<Condidature> readAll() {
        return condidatureRepository.findAll();
    }

    @Override
    public List<Condidature> findAllConditaturesByIdOffre(Long id_Offre) {
        return condidatureRepository.findByOffre_IdOffreOrderByIdCondidatureAsc(id_Offre);
    }

    @Override
     public List<Condidature> findAllConditaturesByIdUser(Long id_User){

        return condidatureRepository.findByUser_IdOrderByIdCondidatureAsc(id_User);
    }


}

