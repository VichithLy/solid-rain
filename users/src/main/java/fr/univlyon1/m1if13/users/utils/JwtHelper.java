package fr.univlyon1.m1if13.users.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Classe qui centralise les opérations de validation et de génération d'un token "métier", c'est-à-dire dédié à cette application.
 *
 * @author Lionel Médini
 */
public class JwtHelper {
    private static final String SECRET = "monbeausecret";
    private static final String ISSUER = "MIF13 TP";
    private static final long LIFETIME = 1800000; // Durée de vie d'un token : 30 secondes
    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET);

    /**
     * Vérifie l'authentification d'un utilisateur grâce à un token JWT
     *
     * @param token  le token à vérifier
     * @param origin la requête HTTP (nécessaire pour vérifier si l'origine de la requête est la même que celle du token
     * @return un booléen qui indique si le token est bien formé et valide (pas expiré) et si l'utilisateur est authentifié
     */
    public static String verifyToken(String token, @NotNull String origin) throws NullPointerException, JWTVerificationException {
        JWTVerifier authenticationVerifier = JWT.require(algorithm).withIssuer(ISSUER).withAudience(origin) // Non-reusable verifier instance
                .build();

        authenticationVerifier.verify(token); // Lève une NullPointerException si le token n'existe pas, et une JWTVerificationException s'il est invalide
        DecodedJWT jwt = JWT.decode(token); // Pourrait lever une JWTDecodeException mais comme le token est vérifié avant, cela ne devrait pas arriver
        return jwt.getClaim("sub").asString();
    }

    /**
     * Crée un token avec les caractéristiques de l'utilisateur
     *
     * @param subject le login de l'utilisateur
     * @param origin  la requête HTTP pour pouvoir en extraire l'origine avec getOrigin()
     * @return le token signé
     * @throws JWTCreationException si les paramètres ne permettent pas de créer un token
     */
    public static String generateToken(String subject, String origin) throws JWTCreationException {
        return JWT.create().withIssuer(ISSUER).withSubject(subject).withAudience(origin).withExpiresAt(new Date(new Date().getTime() + LIFETIME)).sign(algorithm);
    }

    /**
     * Renvoie l'URL d'origine du client, en fonction des headers de proxy (si existants) ou de l'URL de la requête sinon
     *
     * @param request la requête HTTP
     * @return une String qui sera passée aux éléments de l'application pour générer les URL absolues.
     */
    private static String getOrigin(@NotNull HttpServletRequest request) {
        String origin = String.valueOf(request.getRequestURL()).substring(0, request.getRequestURL().lastIndexOf(request.getRequestURI()));
        if (request.getHeader("X-Forwarded-Host") != null && request.getHeader("X-Forwarded-Proto") != null && request.getHeader("X-Forwarded-Path") != null) {
            switch (request.getHeader("X-Forwarded-Proto")) {
                case "http":
                    origin = request.getHeader("X-Forwarded-Proto") + "://" + (request.getHeader("X-Forwarded-Host").endsWith(":80") ? request.getHeader("X-Forwarded-Host").replace(":80", "") : request.getHeader("X-Forwarded-Host"));
                    break;
                case "https":
                    origin = request.getHeader("X-Forwarded-Proto") + "://" + (request.getHeader("X-Forwarded-Host").endsWith(":443") ? request.getHeader("X-Forwarded-Host").replace(":443", "") : request.getHeader("X-Forwarded-Host"));
            }
            origin = origin + request.getHeader("X-Forwarded-Path");
        }
        return origin + request.getContextPath();
    }

}

