package com.example.backend.service;


import com.example.backend.dto.LoginRequest;
import com.example.backend.dto.LoginResponse;
import com.example.backend.entity.Admin;
import com.example.backend.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou mot de passe incorrect"));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Email ou mot de passe incorrect");
        }

        String token = jwtService.generateToken(admin.getEmail());

        return new LoginResponse(token, admin.getEmail(), "Connexion réussie");
    }

    // Méthode pour créer ton compte admin une seule fois
    public void createAdmin(String email, String password) {
        if (adminRepository.findByEmail(email).isEmpty()) {
            Admin admin = Admin.builder()
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .build();
            adminRepository.save(admin);
            System.out.println("✅ Admin créé avec succès : " + email);
        } else {
            System.out.println("⚠️ Admin existe déjà : " + email);
        }
    }
}