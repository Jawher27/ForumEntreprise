package tn.esprit.forum.services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.entities.Announcement;
import tn.esprit.forum.entities.ImageAnnouncment;
import tn.esprit.forum.entities.TypeAnnonce;

import java.util.List;

public interface AnnouncementService {
    //Announcement ajouterParticipant(Announcement a);
    Announcement updateAnnouncement(Announcement announcement, String lib, Long id);
    List<Announcement> findAll();
    Announcement findById (long numAnnouncement);
    void delete (long numAnnouncement);
    //List<Announcement> recommendBestAnnouncements(String type, int quantity) ;
    public Announcement addAnnouncement(Announcement announcement, Long typeId) ;
    //    public Announcement addAnnouncementType(Announcement announcement, String lib) ;
    public Announcement addAnnouncementType(Announcement announcement, String lib, Long id);
    //    List<Announcement> getAnnouncementsByType(Long typeId) ;
    //List<Announcement> filterAndRecommend(List<Announcement> announcements, int requiredSupply);
    public List<Announcement> recommendAnnouncements(String typeLibelle,int requiredSupply);
    List<Announcement> getAnnouncmentbyIduser(Long iduser);
    ImageAnnouncment saveAttachment(MultipartFile file, Long id) throws Exception;
}
