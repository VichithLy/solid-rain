package fr.univlyon1.m1if13.users.controller;

import com.auth0.jwt.exceptions.JWTVerificationException;
import fr.univlyon1.m1if13.users.exception.AuthenticateFailedException;
import fr.univlyon1.m1if13.users.exception.UserNotFoundException;
import fr.univlyon1.m1if13.users.model.User;
import fr.univlyon1.m1if13.users.model.UserDao;
import fr.univlyon1.m1if13.users.utils.JwtHelper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.net.URI;

@RestController
@Tag(name = "Authentication", description = "Authentication API")
public class OperationController {

    @Autowired
    private UserDao users;

    /**
     * Procédure de login "simple" d'un utilisateur, avec JSON.
     *
     * @param pBody  Le login et le password de l'utilisateur. L'utilisateur doit avoir été créé préalablement et son login doit être présent dans le DAO.
     * @param origin Origine de la requête.
     * @return Une ResponseEntity avec le JWT dans le header "Authorization" si le login s'est bien passé, et le code de statut approprié (204, 401 ou 404).
     * @throws JSONException
     */
    @Operation(summary = "Login user", description = "Logs user with login and password. Create a JWT Token.", tags = {"user"})
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "User logged", content = @Content, headers = {@Header(name = "Location", description = "User URL.", schema = @Schema(type = "string")), @Header(name = "Authorization", description = "Created user URL.", schema = @Schema(type = "string")),}), @ApiResponse(responseCode = "400", description = "Cannot accept request parameters", content = @Content), @ApiResponse(responseCode = "401", description = "Incorrect password", content = @Content), @ApiResponse(responseCode = "404", description = "User not found", content = @Content)})
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:8081","http://localhost:8082", "http://localhost:3376", "http://192.168.1.24:8081", "http://192.168.1.23:8081", "http://192.168.75.123", "http://192.168.75.123:3376", "http://192.168.75.123:8080", "https://192.168.75.123", "https://192.168.75.123:3376"})

    @PostMapping(value = "/login", consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(value = HttpStatus.NO_CONTENT) // 204
    public ResponseEntity<Void> login(@Parameter(required = true, schema = @Schema(implementation = User.class)) @RequestBody String pBody, @RequestHeader("Origin") String origin) throws JSONException, UserNotFoundException, AuthenticationException, NullPointerException {

        HttpHeaders responseHeaders = new HttpHeaders();

        JSONObject body = new JSONObject(pBody);
        String login = body.get("login").toString();
        String password = body.get("password").toString();

        users.checkUserNotFound(login);

        User user = users.get(login).get();
        user.authenticate(password);

        // Create JWT Token
        String token = JwtHelper.generateToken(login, origin);
        // Set response header Authentication
        responseHeaders.set("Authorization", "Bearer " + token);
        responseHeaders.setLocation(URI.create("/users/" + login));
        responseHeaders.set("Access-Control-Expose-Headers", "Authorization");

        return new ResponseEntity<>(responseHeaders, HttpStatus.NO_CONTENT); // 204
    }

    /**
     * Procédure de login "simple" d'un utilisateur, avec FORM URL-ENCODED
     *
     * @param paramMap Le login et le password de l'utilisateur. L'utilisateur doit avoir été créé préalablement et son login doit être présent dans le DAO.
     * @param origin   Origine de la requête.
     * @return Une ResponseEntity avec le JWT dans le header "Authorization" si le login s'est bien passé, et le code de statut approprié (204, 401 ou 404).
     */
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:8081","http://localhost:8082", "http://localhost:3376", "http://192.168.75.123", "http://192.168.75.123:3376", "http://192.168.75.123:8080", "http://192.168.1.24:8081", "http://192.168.1.23:8081", "https://192.168.75.123", "https://192.168.75.123:3376"})
    @PostMapping(value = "/login", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> login(@Parameter(required = true, schema = @Schema(implementation = User.class)) @RequestBody MultiValueMap paramMap, @RequestHeader("Origin") String origin) throws UserNotFoundException, NullPointerException, AuthenticationException {

        HttpHeaders responseHeaders = new HttpHeaders();

        String login = (String) paramMap.getFirst("login");
        String password = (String) paramMap.getFirst("password");

        users.checkUserNotFound(login);

        User user = users.get(login).get();
        user.authenticate(password);

        // Create JWT Token
        String token = JwtHelper.generateToken(login, origin);
        // Set response header
        responseHeaders.set("Authorization", "Bearer " + token);
        responseHeaders.setLocation(URI.create("/users/" + login));
        responseHeaders.set("Access-Control-Expose-Headers", "Authorization");

        return new ResponseEntity<>(responseHeaders, HttpStatus.NO_CONTENT);
    }

    /**
     * Réalise la déconnexion.
     *
     * @param token  Le token JWT qui se trouve dans le header "Authorization" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400).
     */
    @Operation(summary = "Logout user", description = "Disconnects user. Invalidates JWT token.", tags = {"user"})
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "User successfully disconnected", content = @Content), @ApiResponse(responseCode = "401", description = "User not authenticated", content = @Content), @ApiResponse(responseCode = "400", description = "Request failed", content = @Content)})
    @DeleteMapping("/logout")
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:8081","http://localhost:8082", "http://localhost:3376", "http://192.168.75.123", "http://192.168.1.24:8081", "http://192.168.1.23:8081", "http://192.168.75.123:3376", "http://192.168.75.123:8080", "https://192.168.75.123", "https://192.168.75.123:3376"})
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String token, @RequestHeader("Origin") String origin) throws UserNotFoundException, JWTVerificationException, NullPointerException {

        // Substring token is needed to remove "Bearer" string at the beginning
        String login = JwtHelper.verifyToken(token.substring(7), origin);

        users.checkUserNotFound(login);
        User user = users.get(login).get();
        user.disconnect();

        // Reset token
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.clearContentHeaders();

        return new ResponseEntity<>(responseHeaders, HttpStatus.NO_CONTENT);
    }

    /**
     * Méthode destinée au serveur Node pour valider l'authentification d'un utilisateur.
     *
     * @param token  Le token JWT qui se trouve dans le header "Authorization" de la requête
     * @param origin L'origine de la requête (pour la comparer avec celle du client, stockée dans le token JWT)
     * @return Une réponse vide avec un code de statut approprié (204, 400, 401).
     */
    @Operation(summary = "Authenticate user", description = "Checks user authentication.", tags = {"user"})
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "User authenticated", content = @Content, headers = @Header(name = "Location", description = "User URL.", schema = @Schema(type = "string"))), @ApiResponse(responseCode = "400", description = "Request failed", content = @Content), @ApiResponse(responseCode = "401", description = "User not authenticated", content = @Content), @ApiResponse(responseCode = "404", description = "User not found", content = @Content)})
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:8081","http://localhost:8082", "http://localhost:3376", "http://192.168.1.24:8081", "http://192.168.1.23:8081", "http://192.168.75.123", "http://192.168.75.123:3376", "http://192.168.75.123:8080", "https://192.168.75.123", "https://192.168.75.123:3376"})
    @GetMapping("/authenticate")
    public ResponseEntity<Void> authenticate(@RequestParam("token") String token, @RequestParam("origin") String origin) throws NullPointerException, JWTVerificationException, AuthenticateFailedException, UserNotFoundException {

        String userToken = JwtHelper.verifyToken(token.substring(7), origin);
        users.checkUserNotFound(userToken);

        User user = users.get(userToken).get();

        if (user.isConnected()) {
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setLocation(URI.create("/users/" + userToken));
            return new ResponseEntity<>(responseHeaders, HttpStatus.NO_CONTENT);
        } else {
            throw new AuthenticateFailedException();
        }
    }
}