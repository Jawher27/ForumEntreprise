package tn.esprit.forum.controllers;

//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Enum.TypeOffre;
import tn.esprit.forum.entities.Offre;
import tn.esprit.forum.entities.Review;
import tn.esprit.forum.services.OffreService;

import java.util.List;

//@Tag(name = "Offer Management")
@RestController
@RequiredArgsConstructor
@RequestMapping("offer")
public class OffreController {
    private final OffreService offreService;

//    @Operation(description = "Add Offre")
    @PostMapping("add-offer/{id}")
    public Offre addOffre(@RequestBody Offre offre , @PathVariable("id") Long id)
    {
        return  offreService.addOffre(offre, id);
    }

//    @Operation(description = "Update Offre")
    @PutMapping ("Update Offre")
    public Offre updateOffre(@RequestBody Offre offre)
    {
        return  offreService.updateOffre(offre);
    }

//    @Operation(description = "Retrieve Offer by Id")
    @DeleteMapping ("{idOffre}")
    public void deleteById(@PathVariable("idOffre") Long idOffre)
    {

        offreService.removeOffer(idOffre);

    }
//    @Operation(description = "Retrieve all Offers")
    @GetMapping("getAllOffers")
    public List<Offre> getAllOffers(){
        return offreService.retriveAllOffers();
    }
//    @Operation(description = "Retrieve Offer by Id")
    @GetMapping("{idOffre}")
    public Offre getOffreById(@PathVariable("idOffre") Long idOffre){
        return offreService.retrieveOfferById(idOffre);
    }
//    @Operation(description = "Retrieve Offer by Type")
    @GetMapping("/by-type/{typeOffre}")
    public List<Offre> getSubscriptionsByType(@PathVariable("typeOffre") TypeOffre typeOffre){
        return offreService.getOffreByType(typeOffre);
    }
//    @Operation(description = " Suggset Offer by UserRole")

    @GetMapping("/suggsetOffer/{id}")
    public List<Offre> getSuggestionsForCurrentUser(@PathVariable("id") Long id) {
        return offreService.getSuggestedOffers(id);
    }
    @GetMapping("/OfferByIDuser/{id}")
    public List<Offre> getOffersByUserId(@PathVariable Long id) {
        return offreService.getOffersByUserId(id);
    }

}
