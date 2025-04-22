package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Stand;
import tn.esprit.forum.services.StandService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("stand")
public class StandController {
    private final StandService standService;


    @PostMapping("/add")
    void addStand(@RequestBody Stand Stand) {
        standService.addStand(Stand);
    }

    @PutMapping("/update/{idStand}")
    void updateStand(@RequestBody Stand Stand, @PathVariable("idStand") Long id) {
        standService.updateStand(Stand, id);
    }

    @DeleteMapping("/delete/{idStand}")
    void deleteStand(@PathVariable("idStand") Long id) {
        standService.deleteStand(id);
    }

    @GetMapping("/all")
    List<Stand> readAll() {
        return standService.getAllStand();
    }

    @GetMapping("/{typePack}")
    public List<Stand> findByPack(@PathVariable("typePack") TypePack typePack) {

        return standService.findByPack(typePack);
    }
}
