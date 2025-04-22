package tn.esprit.forum.services;

import tn.esprit.forum.entities.Review;

import java.util.List;

public interface ReviewService {

    Review addReview(Review  review);
    List<Review> retriveAllReviews();
    Review addReviewAndAssignToOfferAndUser(Review review, Long idOffre , Long id);

}
