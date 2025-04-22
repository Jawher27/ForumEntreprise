package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Announcement;
import tn.esprit.forum.entities.TypeAnnonce;
import tn.esprit.forum.services.TypeAnnoceService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("announcementtype")
public class TypeAnnoceController {
    private final TypeAnnoceService typeAnnoceService;

    @PostMapping("add")
    public TypeAnnonce AddTypeAnnouncement(@RequestBody TypeAnnonce announcment) {
        typeAnnoceService.ajouterType(announcment);
        return announcment;
    }

    @GetMapping("findall")
    public List<TypeAnnonce> findAll(){
        return typeAnnoceService.findAll() ;
    }
    @GetMapping("findByLib/{libelle}")
    public TypeAnnonce findlib(@PathVariable("libelle")String lib){
        return typeAnnoceService.findByType(lib) ;
    }
    @DeleteMapping("delete/{idType}")
    public void delete(@PathVariable long idType) {
        typeAnnoceService.delete(idType);
    }
    @PutMapping("update")
    public TypeAnnonce updateType (@RequestBody  TypeAnnonce typeAnnonce){
        return typeAnnoceService.updateTypeAnnonce(typeAnnonce);
    }


}
