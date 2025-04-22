package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.forum.entities.Announcement;
import tn.esprit.forum.entities.ImageAnnouncment;
import tn.esprit.forum.entities.TypeAnnonce;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.AnnouncementRepository;
import tn.esprit.forum.repositories.ImageAnnouncmentRepository;
import tn.esprit.forum.repositories.TypeAnnoceRepository;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.AnnouncementService;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImp implements AnnouncementService {
    public final AnnouncementRepository announcementRepository;
    private final TypeAnnoceRepository typeAnnoceRepository;
    private final UserRepository userRepository;
    private final ImageAnnouncmentRepository imageAnnouncmentRepository;

//    @Override
//    public Announcement ajouterParticipant(Announcement a) {
//        return announcementRepository.save(a);
//    }

    @Override
    public Announcement updateAnnouncement(Announcement announcement, String lib, Long id) {
        TypeAnnonce type=typeAnnoceRepository.findByLibelle(lib);
        announcement.setTypeAnnonce(type);
        User user=userRepository.findById(id).orElse(null);

        announcement.setUser(user);
        return announcementRepository.save(announcement);
    }

    @Override
    public List<Announcement> findAll() {
        return (List<Announcement>)announcementRepository.findAll();
    }
    @Override
    public List<Announcement> getAnnouncmentbyIduser(Long iduser) {
        return announcementRepository.findByUserId(iduser);
    }

    @Override
    public Announcement findById(long numAnnouncement) {
        return announcementRepository.findById(numAnnouncement).orElse(null);
    }

    @Override
    public void delete(long numAnnouncement) {
        announcementRepository.deleteById(numAnnouncement );

    }

    //    @Override
//    public List<Announcement> recommendBestAnnouncements(String type, int quantity) {
//        // Retrieve all announcements for the given type
//        List<Announcement> announcements = announcementRepository.findByTypeAnnonceLibelle(type);
//
//        // Calculate score for each announcement based on article price/quantity ratio
//        for (Announcement announcement : announcements) {
//            double pricePerUnit = announcement.getArticlePrice() / announcement.getQuantity();
//            announcement.setScore(pricePerUnit);
//        }
//
//        // Sort announcements by score (ascending order)
//        List<Announcement> sortedAnnouncements = announcements.stream()
//                .sorted(Comparator.comparingDouble(Announcement::getScore))
//                .collect(Collectors.toList());
//
//        // Filter announcements based on the requested quantity
//        List<Announcement> recommendedAnnouncements = sortedAnnouncements.stream()
//                .filter(announcement -> announcement.getQuantity() >= quantity)
//                .collect(Collectors.toList());
//
//        return recommendedAnnouncements;
//    }
    @Override
    public Announcement addAnnouncement(Announcement announcement, Long typeId) {
        TypeAnnonce typeAnnonce = typeAnnoceRepository.findById(typeId).orElseThrow(() -> new IllegalArgumentException("TypeAnnonce with ID " + typeId + " not found"));
        announcement.setTypeAnnonce(typeAnnonce);
        return announcementRepository.save(announcement);
    }
    // public Announcement addAnnouncementType(Announcement announcement, String lib,int id) {
    //User user=userRepository.getById(id).orelse(null);

    @Override
    public Announcement addAnnouncementType(Announcement announcement, String lib, Long id) {
        TypeAnnonce type=typeAnnoceRepository.findByLibelle(lib);
        announcement.setTypeAnnonce(type);
        //announcement.setImageAnnouncments(imageAnnouncment);
//        ImageAnnouncment i=typeAnnoceRepository.findByLibelle(lib);
//        announcement.setTypeAnnonce(type);
        User user=userRepository.findById(id).orElse(null);

        announcement.setUser(user);
        return announcementRepository.save(announcement);
    }

    public List<Announcement> getAnnouncementsByType(Long typeId) {
        return announcementRepository.findByTypeAnnonceIdType(typeId);
    }



    public List<Announcement> recommendAnnouncements(String typeLibelle,int requiredSupply) {
        List<Announcement> announcements = announcementRepository.findAll();
        TypeAnnonce typeAnnonce = typeAnnoceRepository.findByLibelle(typeLibelle);
        if (typeAnnonce == null) {
            throw new IllegalArgumentException("Le type d'annonce avec le libellé spécifié n'existe pas.");
        }
//        List<Announcement> announcement = typeAnnonce.getAnnouncements();

        return filterAndRecommend(announcements, requiredSupply);
    }


    private List<Announcement> filterAndRecommend(List<Announcement> announcements, int requiredSupply) {
        // Filter announcements based on required supply
        List<Announcement> filteredAnnouncements = announcements.stream()
                .filter(announcement -> announcement.getQuantity() >= requiredSupply)
                .collect(Collectors.toList());

        // Sort filtered announcements by price per item (cheapest to most expensive)
        filteredAnnouncements.sort(Comparator.comparingDouble(this::calculatePricePerItem));

        return filteredAnnouncements;
    }

    private double calculatePricePerItem(Announcement announcement) {
        // Calculate price per item (price/quantity)
        if (announcement.getQuantity() != 0) {
            return announcement.getQuantity() / announcement.getArticlePrice();
        }
        // Return a large value if quantity is zero to ensure it's placed at the end of the sorted list
        return Double.MIN_VALUE;
    }























    @Override
    public ImageAnnouncment saveAttachment(MultipartFile file, Long id) throws Exception {
        Announcement course = announcementRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("No course found with this id " + id));

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if (fileName.contains("..")) {
                throw new Exception("Filename contains invalid path sequence " + fileName);
            }

            String contentType = file.getContentType();
            byte[] fileData =  file.getBytes();

            ImageAnnouncment attachment = new ImageAnnouncment(fileName, contentType, fileData);
            attachment.setAnnouncement(course);  // Associate the file with the course

            return imageAnnouncmentRepository.save(attachment);

        } catch (IOException e) {
            throw new Exception("Could not save file: " + fileName, e);
        }
    }









}



