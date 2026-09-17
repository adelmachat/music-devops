package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.service.CloudinaryService;
import com.example.backend.service.SpectacleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SpectacleController {

    private final SpectacleService spectacleService;
    private final CloudinaryService cloudinaryService;

    @GetMapping("/api/spectacles")
    public ResponseEntity<List<SpectacleResponseDTO>> getAll() {
        return ResponseEntity.ok(spectacleService.getAllSpectacles());
    }

    @GetMapping("/api/spectacles/{id}")
    public ResponseEntity<SpectacleResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(spectacleService.getSpectacleById(id));
    }

    @PostMapping("/api/admin/spectacles")
    public ResponseEntity<SpectacleResponseDTO> create(
            @Valid @RequestBody SpectacleDTO dto) {
        return ResponseEntity.ok(spectacleService.createSpectacle(dto));
    }

    @PutMapping("/api/admin/spectacles/{id}")
    public ResponseEntity<SpectacleResponseDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody SpectacleDTO dto) {
        return ResponseEntity.ok(spectacleService.updateSpectacle(id, dto));
    }

    @DeleteMapping("/api/admin/spectacles/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        spectacleService.deleteSpectacle(id);
        return ResponseEntity.ok("Spectacle supprimé avec succès");
    }

    @PostMapping("/api/admin/spectacles/{id}/affiche")
    public ResponseEntity<MediaUploadResponse> uploadAffiche(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            System.out.println("=== UPLOAD AFFICHE START ===");
            System.out.println("Spectacle ID: " + id);
            System.out.println("Fichier: " + file.getOriginalFilename());
            System.out.println("Taille: " + file.getSize() + " bytes");
            System.out.println("ContentType: " + file.getContentType());

            Map result = cloudinaryService.uploadImage(file, "spectacles/affiches");

            System.out.println("=== CLOUDINARY RESULT ===");
            System.out.println(result);

            String url = result.get("secure_url").toString();
            String publicId = result.get("public_id").toString();

            System.out.println("URL: " + url);

            spectacleService.uploadAfficheUrl(id, url);

            System.out.println("=== UPLOAD AFFICHE OK ===");
            return ResponseEntity.ok(
                    new MediaUploadResponse(url, publicId, "image", "Affiche uploadée"));
        } catch (Exception e) {
            System.err.println("=== ERREUR UPLOAD AFFICHE ===");
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(new MediaUploadResponse(null, null, null, e.getMessage()));
        }
    }

    @PostMapping("/api/admin/spectacles/{id}/photos")
    public ResponseEntity<PhotoDTO> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String legende,
            @RequestParam(required = false, defaultValue = "0") Integer ordre) {
        try {
            System.out.println("=== UPLOAD PHOTO START ===");
            System.out.println("Spectacle ID: " + id);

            Map result = cloudinaryService.uploadImage(file, "spectacles/photos");
            String url = result.get("secure_url").toString();

            System.out.println("Photo URL: " + url);
            return ResponseEntity.ok(
                    spectacleService.addPhoto(id, url, legende, ordre));
        } catch (Exception e) {
            System.err.println("=== ERREUR UPLOAD PHOTO ===");
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/api/admin/spectacles/{id}/reels")
    public ResponseEntity<ReelDTO> uploadReel(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String titre) {
        try {
            System.out.println("=== UPLOAD REEL START ===");
            System.out.println("Spectacle ID: " + id);
            System.out.println("Fichier: " + file.getOriginalFilename());
            System.out.println("Taille: " + file.getSize() + " bytes");

            Map result = cloudinaryService.uploadVideo(file, "spectacles/reels");
            String url = result.get("secure_url").toString();

            System.out.println("Reel URL: " + url);
            return ResponseEntity.ok(
                    spectacleService.addReel(id, url, titre));
        } catch (Exception e) {
            System.err.println("=== ERREUR UPLOAD REEL ===");
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}