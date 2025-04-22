package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Forum;
import tn.esprit.forum.services.ForumService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("forum")
public class ForumController {
    private final ForumService forumService;
    @PostMapping("/add")
    void addForum(@RequestBody Forum forum){
        forumService.addForum(forum);
    }
    @PutMapping("/update/{idForum}")
    void updateForum(@RequestBody Forum forum,@PathVariable("idForum")Long id)
    {
        forumService.updateForum(forum,id);
    }
    @DeleteMapping("/delete/{idForum}")
    void deleteForum(@PathVariable("idForum")Long id){
        forumService.deleteForum(id);
    }
    @GetMapping("/all")
    List<Forum> readAll(){
        return forumService.getAllForum();
    }

    @GetMapping("/lastForum")
        Forum getLast(){
        return forumService.GetLatest();
        }
}
