package tn.esprit.forum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.forum.services.FactureService;

@RestController
@RequiredArgsConstructor
@RequestMapping("facture")
public class FactureController {
    private final FactureService factureService;

}
