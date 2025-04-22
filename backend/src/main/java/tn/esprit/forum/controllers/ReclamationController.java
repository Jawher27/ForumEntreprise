package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.forum.services.ReclamationService;
@RestController
@RequiredArgsConstructor
@RequestMapping("reclamation")
public class ReclamationController {
    private final ReclamationService reclamationService;
}
