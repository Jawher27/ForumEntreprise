package tn.esprit.forum.services;


import tn.esprit.forum.entities.Forum;

import java.util.List;

public interface ForumService {
    Forum addForum(Forum forum);

    Forum updateForum(Forum forum,Long id);

    List<Forum> getAllForum();

    Forum findById(Long id);

    void deleteForum(Long id);
    Forum GetLatest();

}
