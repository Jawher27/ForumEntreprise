package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;
import tn.esprit.forum.entities.Forum;
import tn.esprit.forum.repositories.ForumRepository;
import tn.esprit.forum.services.ForumService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForumServiceImp implements ForumService {
    private final ForumRepository forumRepository;

    @Override
    public Forum addForum(Forum forum) {
        return forumRepository.save(forum);
    }

    @Override
    public Forum updateForum(Forum forum,Long id) {


        Optional<Forum> existingForumOptional = forumRepository.findById(id);
        if (existingForumOptional.isPresent()) {
            // Mettre à jour les détails du forum existant avec les données fournies
            Forum existingForum = existingForumOptional.get();
            existingForum.setDateForum(forum.getDateForum());
            existingForum.setDescription(forum.getDescription());
            existingForum.setHour(forum.getHour());
            existingForum.setBloc(forum.getBloc());
            existingForum.setDescription(forum.getDescription());
            return forumRepository.save(existingForum);
        } else {
            throw new NotFoundException("Forum not found with id: " + id);
        }
    }

    @Override
    public List<Forum> getAllForum() {
        return forumRepository.findAll();
    }

    @Override
    public Forum findById(Long id) {
        return forumRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("NO Forum FOUND WITH THIS ID"));
    }

    @Override
    public void deleteForum(Long id) {
        forumRepository.deleteById(id);
    }

    @Override
    public Forum GetLatest() {

        return forumRepository.findFirstByDateForumAfterOrderByDateForumAsc(LocalDate.now());
    }
}
