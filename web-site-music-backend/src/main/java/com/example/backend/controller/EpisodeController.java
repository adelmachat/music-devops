package com.example.backend.controller;


import com.example.backend.dto.EpisodeDTO;
import com.example.backend.dto.EpisodeResponseDTO;
import com.example.backend.dto.MediaUploadResponse;
import com.example.backend.dto.ReelDTO;
import com.example.backend.service.CloudinaryService;
import com.example.backend.service.EpisodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class EpisodeController {

    private final EpisodeService episodeService;
    private final CloudinaryService cloudinaryService;

    // ─── PUBLIC ───────────────────────────────────────

    @GetMapping("/api/episodes")
    public ResponseEntity<List<EpisodeResponseDTO>> getAll() {
        return ResponseEntity.ok(episodeService.getAllEpisodes());
    }

    @GetMapping("/api/episodes/{id}")
    public ResponseEntity<EpisodeResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(episodeService.getEpisodeById(id));
    }

    // ─── ADMIN ────────────────────────────────────────

    @PostMapping("/api/admin/episodes")
    public ResponseEntity<EpisodeResponseDTO> create(
            @Valid @RequestBody EpisodeDTO dto) {
        return ResponseEntity.ok(episodeService.createEpisode(dto));
    }

    @PutMapping("/api/admin/episodes/{id}")
    public ResponseEntity<EpisodeResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody EpisodeDTO dto) {
        return ResponseEntity.ok(episodeService.updateEpisode(id, dto));
    }

    @DeleteMapping("/api/admin/episodes/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        episodeService.deleteEpisode(id);
        return ResponseEntity.ok("Episode supprimé avec succès");
    }

    // Upload affiche episode
    @PostMapping("/api/admin/episodes/{id}/affiche")
    public ResponseEntity<MediaUploadResponse> uploadAffiche(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            Map result = cloudinaryService.uploadImage(file, "podcast/affiches");
            String url = result.get("secure_url").toString();
            String publicId = result.get("public_id").toString();
            episodeService.uploadAfficheUrl(id, url);
            return ResponseEntity.ok(
                    new MediaUploadResponse(url, publicId, "image", "Affiche uploadée"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new MediaUploadResponse(null, null, null, e.getMessage()));
        }
    }

    // Upload reel episode podcast
    @PostMapping("/api/admin/episodes/{id}/reels")
    public ResponseEntity<ReelDTO> uploadReel(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String titre) {
        try {
            Map result = cloudinaryService.uploadVideo(file, "podcast/reels");
            String url = result.get("secure_url").toString();
            return ResponseEntity.ok(
                    episodeService.addReel(id, url, titre));
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}