package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Enum.TypePack;
import tn.esprit.forum.entities.Pack;
import tn.esprit.forum.services.PackService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("pack")
public class PackController {
    private final PackService packService;

    @PostMapping("/add")
    void addPack(@RequestBody Pack pack){
        packService.addPack(pack);
    }
    @PutMapping("/update/{idPack}")
    void updatePack(@RequestBody Pack pack,@PathVariable("idPack")Long id)
    {
        packService.updatePack(pack,id);
    }
    @DeleteMapping("/delete/{idPack}")
    void deletePack(@PathVariable("idPack")Long id){
        packService.deletePack(id);
    }
    @GetMapping("/all")
    List<Pack> readAll(){
        return packService.getAllPack();
    }
    @GetMapping("/type/{typePack}")
    Pack findBtType(@PathVariable("typePack") TypePack typePack) {
        return packService.findBtType(typePack);
    }
    @PostMapping("/affecte/{idStand}/{typePack}")
    public void affectePackToStand(@PathVariable("typePack") TypePack type,@PathVariable("idStand") Long idStand) {

            packService.AffectePackToStand(type, idStand);

    }
}
