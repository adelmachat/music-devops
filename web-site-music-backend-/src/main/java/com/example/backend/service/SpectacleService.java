package com.example.backend.service;


import com.example.backend.dto.PhotoDTO;
import com.example.backend.dto.ReelDTO;
import com.example.backend.dto.SpectacleDTO;
import com.example.backend.dto.SpectacleResponseDTO;
import com.example.backend.entity.Photo;
import com.example.backend.entity.Reel;
import com.example.backend.entity.Spectacle;
import com.example.backend.repository.PhotoRepository;
import com.example.backend.repository.ReelRepository;
import com.example.backend.repository.SpectacleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpectacleService {

    private final SpectacleRepository spectacleRepository;
    private final PhotoRepository photoRepository;
    private final ReelRepository reelRepository;

    // Récupérer tous les spectacles
    public List<SpectacleResponseDTO> getAllSpectacles() {
        return spectacleRepository.findAllByOrderByDateDesc()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Récupérer un spectacle par id
    public SpectacleResponseDTO getSpectacleById(Long id) {
        Spectacle spectacle = spectacleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Spectacle non trouvé"));
        return toResponseDTO(spectacle);
    }

    // Créer un spectacle
    public SpectacleResponseDTO createSpectacle(SpectacleDTO dto) {
        Spectacle spectacle = Spectacle.builder()
                .titre(dto.getTitre())
                .date(dto.getDate())
                .lieu(dto.getLieu())
                .description(dto.getDescription())
                .afficheUrl(dto.getAfficheUrl())
                .build();
        return toResponseDTO(spectacleRepository.save(spectacle));
    }

    // Modifier un spectacle
    public SpectacleResponseDTO updateSpectacle(Long id, SpectacleDTO dto) {
        Spectacle spectacle = spectacleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Spectacle non trouvé"));

        spectacle.setTitre(dto.getTitre());
        spectacle.setDate(dto.getDate());
        spectacle.setLieu(dto.getLieu());
        spectacle.setDescription(dto.getDescription());
        if (dto.getAfficheUrl() != null) {
            spectacle.setAfficheUrl(dto.getAfficheUrl());
        }

        return toResponseDTO(spectacleRepository.save(spectacle));
    }

    // Supprimer un spectacle
    @Transactional
    public void deleteSpectacle(Long id) {
        spectacleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Spectacle non trouvé"));
        photoRepository.deleteBySpectacleId(id);
        reelRepository.deleteBySpectacleId(id);
        spectacleRepository.deleteById(id);
    }

    // Ajouter une photo à un spectacle
    public PhotoDTO addPhoto(Long spectacleId, String url, String legende, Integer ordre) {
        Spectacle spectacle = spectacleRepository.findById(spectacleId)
                .orElseThrow(() -> new RuntimeException("Spectacle non trouvé"));

        Photo photo = Photo.builder()
                .url(url)
                .legende(legende)
                .ordre(ordre)
                .spectacle(spectacle)
                .build();

        Photo saved = photoRepository.save(photo);
        PhotoDTO dto = new PhotoDTO();
        dto.setId(saved.getId());
        dto.setUrl(saved.getUrl());
        dto.setLegende(saved.getLegende());
        dto.setOrdre(saved.getOrdre());
        return dto;
    }

    // Ajouter un reel à un spectacle
    public ReelDTO addReel(Long spectacleId, String url, String titre) {
        Spectacle spectacle = spectacleRepository.findById(spectacleId)
                .orElseThrow(() -> new RuntimeException("Spectacle non trouvé"));

        Reel reel = Reel.builder()
                .url(url)
                .titre(titre)
                .type(Reel.ReelType.SPECTACLE)
                .spectacle(spectacle)
                .build();

        Reel saved = reelRepository.save(reel);
        ReelDTO dto = new ReelDTO();
        dto.setId(saved.getId());
        dto.setUrl(saved.getUrl());
        dto.setTitre(saved.getTitre());
        dto.setType(saved.getType().name());
        return dto;
    }

    // Mapper entity -> DTO
    private SpectacleResponseDTO toResponseDTO(Spectacle spectacle) {
        SpectacleResponseDTO dto = new SpectacleResponseDTO();
        dto.setId(spectacle.getId());
        dto.setTitre(spectacle.getTitre());
        dto.setDate(spectacle.getDate());
        dto.setLieu(spectacle.getLieu());
        dto.setDescription(spectacle.getDescription());
        dto.setAfficheUrl(spectacle.getAfficheUrl());

        dto.setPhotos(photoRepository.findBySpectacleIdOrderByOrdre(spectacle.getId())
                .stream().map(p -> {
                    PhotoDTO pdto = new PhotoDTO();
                    pdto.setId(p.getId());
                    pdto.setUrl(p.getUrl());
                    pdto.setLegende(p.getLegende());
                    pdto.setOrdre(p.getOrdre());
                    return pdto;
                }).collect(Collectors.toList()));

        dto.setReels(reelRepository.findBySpectacleId(spectacle.getId())
                .stream().map(r -> {
                    ReelDTO rdto = new ReelDTO();
                    rdto.setId(r.getId());
                    rdto.setUrl(r.getUrl());
                    rdto.setTitre(r.getTitre());
                    rdto.setType(r.getType().name());
                    return rdto;
                }).collect(Collectors.toList()));

        return dto;
    }

    public void uploadAfficheUrl(Long id, String url) {
        Spectacle spectacle = spectacleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Spectacle non trouvé"));
        spectacle.setAfficheUrl(url);
        spectacleRepository.save(spectacle);
    }
}