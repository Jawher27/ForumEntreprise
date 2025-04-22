package tn.esprit.forum.services.Imp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.forum.entities.Offre;
import tn.esprit.forum.entities.Review;
import tn.esprit.forum.entities.User;
import tn.esprit.forum.repositories.OffreRepository;
import tn.esprit.forum.repositories.ReviewRepository;
import tn.esprit.forum.repositories.UserRepository;
import tn.esprit.forum.services.ReviewService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImp implements ReviewService {
    private final ReviewRepository reviewRepository;
    private  final OffreRepository offreRepository ;
    private  final UserRepository userRepository ;



    @Override
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> retriveAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review addReviewAndAssignToOfferAndUser(Review review, Long idOffre ,Long id) {
        Offre offre= offreRepository.findById(idOffre).orElseThrow(() -> new IllegalArgumentException("no offer found with this id " + idOffre));
        User user   = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("no User found with this id " + id)) ;



        review.setOffre(offre);
        review.setUser(user);

        reviewRepository.save(review);
        return reviewRepository.save(review);
    }
}
