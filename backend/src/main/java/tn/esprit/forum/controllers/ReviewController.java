package tn.esprit.forum.controllers;

//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.forum.entities.Review;
import tn.esprit.forum.services.ReviewService;

import java.util.List;

//@Tag(name = "Review Management")
@RestController
@RequiredArgsConstructor
@RequestMapping("Review")
public class ReviewController {
    private final ReviewService reviewService;
//    @Operation(description = "Retrieve all Reviews")
    @GetMapping("getAllReviews")
    public List<Review> getAllReviews(){
        return reviewService.retriveAllReviews();
    }

//    @Operation(description = "Add Review and Assign to Offre")
    @PutMapping("/addReviewAndAssignToOffer/{idOffre}/{id}")
    public Review addReviewAndAssignToOffer(@RequestBody Review review, @PathVariable("idOffre") Long idOffre , @PathVariable("id") Long id)
    {
        return  reviewService.addReviewAndAssignToOfferAndUser( review,  idOffre , id);
    }
}
