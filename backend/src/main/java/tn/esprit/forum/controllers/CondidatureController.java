package tn.esprit.forum.controllers;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.entities.Condidature;
import tn.esprit.forum.entities.Enum.EtatCondidature;
import tn.esprit.forum.services.CondidatureService;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("condidature")
@CrossOrigin("http://localhost:4200")
public class CondidatureController {

    private final CondidatureService condidatureService;


//    @PostMapping("add/{idOffer}/{id}")
//    public Condidature addCondidature(@RequestBody Condidature condidature,
//                                      @RequestParam("cvFile") MultipartFile cvFile,
//                                      @RequestParam("coverLetterFile") MultipartFile coverLetterFile,
//                                      @PathVariable("idOffer")Long idO,
//                                      @PathVariable("id")Long idU) throws Exception {
//
//
//        return condidatureService.addCondidature(condidature,cvFile, coverLetterFile,idO,idU);
//    }

//    @PostMapping("/add/{idOffer}/{idUser}")
//    public Condidature addCondidature(
//            @ModelAttribute Condidature condidature,
//            @RequestParam("cvFile") MultipartFile cvFile,
//            @RequestParam("coverLetterFile") MultipartFile coverLetterFile,
//            @PathVariable("idOffer") Long idOffer,
//            @PathVariable("idUser") Long idUser) {
//
//        return condidatureService.addCondidature(condidature, cvFile, coverLetterFile, idOffer, idUser);
//    }

//    @PostMapping(value ="/upload/{offreId}/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Condidature> ajouterCondidature(
//            @PathVariable("offreId") Long offreId,
//            @PathVariable("userId") Long userId,
//            @RequestParam("etatCondidature") String etatCondidature,
//            @RequestParam("coverLetter") MultipartFile coverLetter,
//            @RequestParam("cv") MultipartFile cv)  {
//        try {
//
//        Condidature savedCondidature = condidatureService.ajouterCondidatureAvecFichiers(
//                etatCondidature, offreId, userId, coverLetter, cv);
//
//        return ResponseEntity.ok(savedCondidature);
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().build();
//        }
//
//    }


        @PostMapping(value = "/upload/{offreId}/{userId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<?> ajouterCondidature(
                @PathVariable Long offreId,
                @PathVariable Long userId,
                @RequestParam EtatCondidature etatCondidature,
                @RequestPart("coverLetter") MultipartFile coverLetter,
                @RequestPart("cv") MultipartFile cv) {

            try {
                // Validation des fichiers
                  if (coverLetter.isEmpty() || cv.isEmpty()) {
                    return ResponseEntity.badRequest().body("Les fichiers ne doivent pas être vides");
                }

                // Vérification des types de fichiers (optionnel)
                if (!coverLetter.getContentType().equals("application/pdf")) {
                    return ResponseEntity.badRequest().body("La lettre de motivation doit être un PDF");
                }

                if (!cv.getContentType().equals("application/pdf")) {
                    return ResponseEntity.badRequest().body("Le CV doit être un PDF");
                }

                Condidature savedCondidature = condidatureService.ajouterCondidatureAvecFichiers(
                        etatCondidature.name(), offreId, userId, coverLetter, cv);

                return ResponseEntity.status(HttpStatus.CREATED).body(savedCondidature);

            } catch (EntityNotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } catch (IOException e) {
                return ResponseEntity.internalServerError().body("Erreur lors du traitement des fichiers");
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }


    @GetMapping("/{candidatureId}")
    public ResponseEntity<Condidature> getCondidatureById(@PathVariable Long candidatureId) {
        try {
            Condidature candidature = condidatureService.getCondidatureById(candidatureId);
            // Remove byte arrays from the response to avoid large payload
            candidature.setCv(null);
            candidature.setCoverLetter(null);
            return ResponseEntity.ok(candidature);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{candidatureId}/cv")
    public ResponseEntity<byte[]> getCV(@PathVariable Long candidatureId) {
        try {
            Condidature candidature = condidatureService.getCondidatureById(candidatureId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename("cv_" + candidatureId + ".pdf").build());

            return new ResponseEntity<>(candidature.getCv(), headers, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{candidatureId}/cover-letter")
    public ResponseEntity<byte[]> getCoverLetter(@PathVariable Long candidatureId) {
        try {
            Condidature candidature = condidatureService.getCondidatureById(candidatureId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename("coverLetter_" + candidatureId + ".pdf").build());

            return new ResponseEntity<>(candidature.getCoverLetter(), headers, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }






//    @PutMapping("update")
//    public  Condidature updateCondidature(@PathVariable Long idCondidature,@RequestBody Condidature updtcondidature){
//
//        return condidatureService.updateCondidature(idCondidature,updtcondidature);
//    }



    @PutMapping("update")
    public  Condidature updateCondidature(@RequestBody Condidature condidature){

        return condidatureService.updateCondidature(condidature);
    }
    @PutMapping("updateEtat/{id}")
    public ResponseEntity<Condidature> updateEtatCondidature(
            @PathVariable("id") Long idCondidature,
            @RequestBody Condidature updtcondidature) {

        Condidature updatedCondidature = condidatureService.updateEtatCondidature(idCondidature, updtcondidature);
        return ResponseEntity.ok(updatedCondidature);
    }


    @DeleteMapping("delete/{idCondidature}")
    public boolean removeCondidature(@PathVariable long idCondidature ) {

        condidatureService.removeCondidature(idCondidature);
        return true;
    }
    @GetMapping("/all")
    public List<Condidature> readALL()
    {
        return condidatureService.readAll();
    }

    @GetMapping("/GetCanditaturesbyOffre/{id_Offre}")
    public List<Condidature> findAllConditaturesByIdOffre(@PathVariable Long id_Offre) {

     return condidatureService.findAllConditaturesByIdOffre(id_Offre);
    }

    @GetMapping("/GetCanditaturesbyUser/{id}")
    public List<Condidature> findAllConditaturesByIdUser(@PathVariable("id") Long id_User) {

        return condidatureService.findAllConditaturesByIdUser(id_User);
    }

    @GetMapping("/GetCanditaturesbyUserAnfOffre/{id}/{id_Offre}")
    public List<Condidature> findAllConditaturesByIdUserAndIdOffre(@PathVariable("id") Long id_User, @PathVariable Long id_Offre) {

        return condidatureService.findAllConditaturesByIdUserAndIdOffre(id_User, id_Offre);
    }


}
