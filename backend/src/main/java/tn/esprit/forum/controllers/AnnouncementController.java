package tn.esprit.forum.controllers;

import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tn.esprit.forum.entities.Announcement;
import tn.esprit.forum.entities.ImageAnnouncment;
import tn.esprit.forum.entities.ResponseData;
import tn.esprit.forum.entities.TypeAnnonce;
import tn.esprit.forum.services.AnnouncementService;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("announcement")
public class AnnouncementController {
    private final AnnouncementService announcementService;
    //    @PostMapping("add")
//    public Announcement AddAnnouncement(@RequestBody Announcement announcment) {
//        announcementService.ajouterParticipant(announcment);
//        return announcment;
//    }
    @GetMapping("findall")
    public List<Announcement> findAll(){
        return announcementService.findAll() ;
    }

    @GetMapping("findbyid/{idann}")
    public Announcement FindById(@PathVariable int idann){
        return announcementService. findById(idann);
    }

    @PutMapping("update/{libelle}/{iduser}")
    public Announcement update (@RequestBody  Announcement announcement,@PathVariable("libelle")String lib,@PathVariable("iduser")Long iduser){
        return announcementService.updateAnnouncement(announcement,lib,iduser);
    }
    @DeleteMapping("/{idann}")
    public void delete(@PathVariable long idann) {
        announcementService.delete(idann);
    }


    @PostMapping("add/{typeId}")
    public Announcement addAnnouncement(@RequestBody Announcement announcement, @PathVariable long typeId) {
        Announcement addedAnnouncement = announcementService.addAnnouncement(announcement, typeId);
        return addedAnnouncement;
    }
    @PostMapping( "addA/{libelle}/{iduser}")
    public Announcement addAnnouncementWithTypeAnnonce(@RequestBody Announcement announcement, @PathVariable("libelle")String lib,@PathVariable("iduser")Long iduser) {

        Announcement addedAnnouncement = announcementService.addAnnouncementType(announcement, lib,iduser);
        return addedAnnouncement;
    }

    @GetMapping("/recommend/{typeLibelle}/{requiredSupply}")
    public List<Announcement> recommendAnnouncements(@PathVariable String typeLibelle, @PathVariable int requiredSupply) {
        return announcementService.recommendAnnouncements(typeLibelle, requiredSupply);
    }

    @GetMapping("/user/{userId}")
    public List<Announcement> getAnnouncementsByUserId(@PathVariable Long userId) {
        List<Announcement> announcements = announcementService.getAnnouncmentbyIduser(userId);
        return announcements;
    }

//    @PostMapping(value = {"addwithpic/{libelle}/{iduser}"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
//    public Announcement addAnnouncementWithTypeAnnoncewithImage(@RequestBody Announcement announcement, @PathVariable("libelle")String lib, @PathVariable("iduser")Long iduser, @RequestPart("imageFile")MultipartFile[] file) {
//       try{
//           Set<ImageAnnouncment> images = uploadImage(file);
//           announcement.setArticlePicture(images);
//        Announcement addedAnnouncement = announcementService.addAnnouncementType(announcement, lib,iduser);
//        return addedAnnouncement;}catch (Exception e){
//           System.out.println(e.getMessage());
//           return null;
//       }
//    }

    //@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseData uploadFile(@RequestPart("file") MultipartFile file, @RequestParam("id") Long id) throws Exception {
        ImageAnnouncment cour = null;
        String downloadURL = "";

        // Save the attachment (file) and get the Filecalss entity
        cour = announcementService.saveAttachment(file,id);

        // Build download URL
        downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .path(String.valueOf(cour.getId())) // Make sure getId() method is available in your Filecalss entity
                .toUriString();

        return new ResponseData(cour.getName(),
                downloadURL, file.getContentType(), file.getSize());
    }

}
