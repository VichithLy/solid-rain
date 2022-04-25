package fr.univlyon1.m1if13.users.controller;

import fr.univlyon1.m1if13.users.exception.UserAlreadyExistsException;
import fr.univlyon1.m1if13.users.exception.UserNotFoundException;
import fr.univlyon1.m1if13.users.model.User;
import fr.univlyon1.m1if13.users.model.UserDao;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import java.net.URI;
import java.util.NoSuchElementException;
import java.util.Set;

@RestController
@Tag(name = "User Management", description = "Manages users (create, read, udpate, delete).")
public class ManagingController {

    @Autowired
    private UserDao users;

    /**
     * Affiche un utilisateur suivant son login en format JSON ou XML.
     *
     * @param login user login
     * @return response code
     */
    @Operation(summary = "Get user by login", description = "Gets a user by his/her login.", tags = {"user"})
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successful operation", content = {@Content(schema = @Schema(implementation = User.class)), @Content(mediaType = "text/html", schema = @Schema(defaultValue = "Page HTML contenant un utilisateur"))}), @ApiResponse(responseCode = "404", description = "User not found", content = {@Content})})
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:8081","http://localhost:8082", "http://localhost:3376", "http://192.168.1.24:8081", "http://192.168.1.23:8081", "http://192.168.75.123", "http://192.168.75.123:3376", "http://192.168.75.123:8080", "https://192.168.75.123", "https://192.168.75.123:3376"})
    @GetMapping(value = "/users/{login}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<User> getUser(@Parameter(in = ParameterIn.PATH, name = "login", required = true) @PathVariable String login) throws UserNotFoundException {

        users.checkUserNotFound(login);
        User user = users.get(login).get();
        return ResponseEntity.ok(user);
    }

    /**
     * Affiche un utilisateur suivant son login en format HTML.
     *
     * @param login user login
     * @return response code
     */
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:8081","http://localhost:8082", "http://localhost:3376", "http://192.168.75.123", "http://192.168.1.24:8081", "http://192.168.1.23:8081", "http://192.168.75.123:3376", "http://192.168.75.123:8080", "https://192.168.75.123", "https://192.168.75.123:3376"})
    @GetMapping(value = "/users/{login}", produces = {MediaType.TEXT_HTML_VALUE})
    public ModelAndView getUser(@PathVariable String login, Model model) {
        try {

            User user = users.get(login).orElseThrow();
            // We use this class instead of a String because of the @RestController annotation
            ModelAndView modelAndView = new ModelAndView();
            model.addAttribute("user", user.getLogin());
            modelAndView.setViewName("user");

            return modelAndView;

        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found", e);
        }
    }

    /**
     * Affiche tous les utilisateurs présent dans le bean users en format JSON ou XML.
     *
     * @return response code
     */
    @Operation(summary = "Get all users", description = "Gets all users.", tags = {"users"})
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successful operation", content = {@Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = User.class))), @Content(mediaType = "application/xml", schema = @Schema(implementation = User.class)), @Content(mediaType = "text/html", schema = @Schema(defaultValue = "Page HTML contenant une liste d'utilisateur"))})})
    @CrossOrigin(origins = {"http://localhost:8080", "http://localhost:8081","http://localhost:8082", "http://localhost:3376", "http://192.168.1.24:8081", "http://192.168.1.23:8081", "http://192.168.75.123", "http://192.168.75.123:3376", "http://192.168.75.123:8080", "https://192.168.75.123", "https://192.168.75.123:3376"})
    @GetMapping(value = "/users", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    public ResponseEntity<Set<String>> getAllUsers() {
        if (users.getAll().isEmpty()) return null;

        Set<String> usersList = users.getAll();
        return ResponseEntity.ok(usersList);
    }

    /**
     * Affiche tous les utilisateurs présent dans le bean users en format HTML.
     *
     * @return response code
     */
    @GetMapping(value = "/users")
    public ModelAndView getAllUsers(Model model) {
        if (users.getAll().isEmpty()) return null;

        Set<String> usersList = users.getAll();
        model.addAttribute("users", usersList);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("users");

        return modelAndView;
    }

    @Operation(summary = "Create user", description = "Creates a new user.", tags = {"user"})
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Successful operation", content = @Content(), headers = @Header(name = "Location", description = "Created user URL.", schema = @Schema(type = "string"))), @ApiResponse(responseCode = "409", description = "User already exists", content = @Content()), @ApiResponse(responseCode = "400", description = "Request failed", content = @Content())})
    @PostMapping(value = "/users", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE})
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity createUser(@Parameter(schema = @Schema(implementation = User.class)) @RequestBody MultiValueMap paramMap) throws UserAlreadyExistsException, NullPointerException {

        HttpHeaders responseHeaders = new HttpHeaders();

        String login = (String) paramMap.getFirst("login");
        String password = (String) paramMap.getFirst("password");

        users.checkUserAlreadyExists(login);

        User newUser = new User(login, password);
        users.save(newUser);
        responseHeaders.setLocation(URI.create("/users/" + login));

        return new ResponseEntity<Void>(responseHeaders, HttpStatus.CREATED);
    }

    /**
     * Crée un nouvel utilisateur.
     *
     * @param pBody
     * @return
     * @throws JSONException
     */
    @ApiResponses(value = {@ApiResponse(responseCode = "201", content = @Content())})
    @PostMapping(value = "/users", consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity createUser(@Parameter(schema = @Schema(implementation = User.class)) @RequestBody String pBody) throws JSONException, NullPointerException, UserAlreadyExistsException {

        HttpHeaders responseHeaders = new HttpHeaders();

        JSONObject body = new JSONObject(pBody);
        String login = body.get("login").toString();
        String password = body.get("password").toString();

        users.checkUserAlreadyExists(login);
        User newUser = new User(login, password);
        users.save(newUser);
        responseHeaders.setLocation(URI.create("/users/" + login));

        return new ResponseEntity<Void>(responseHeaders, HttpStatus.CREATED);
    }

    /**
     * Met à jour le mot de passe d'un utilisateur suivant son login avec FORM URLENCODED.
     *
     * @param user
     * @return
     */
    @Operation(summary = "Update user's password", description = "Updates user's password.", tags = {"user"})
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "Successful operation", content = @Content), @ApiResponse(responseCode = "400", description = "Request failed", content = @Content), @ApiResponse(responseCode = "404", description = "User not found", content = @Content)})
    @PutMapping(value = "/users/{login}", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity updateUser(@PathVariable String login, @ModelAttribute User user) throws UserNotFoundException {
        users.checkUserNotFound(login);
        try {
            User deleteUser = users.get(user.getLogin()).get();
            users.delete(deleteUser);
            users.save(user);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    /**
     * Supprime un utilisateur suivant son login.
     *
     * @param login
     * @return ResponseEntity
     */
    @Operation(summary = "Delete user", description = "Deletes a user.", tags = {"user"})
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "Successful operation", content = @Content), @ApiResponse(responseCode = "404", description = "User not found", content = @Content)})
    @DeleteMapping(value = "/users/{login}")
    public ResponseEntity deleteUser(@PathVariable String login) throws UserNotFoundException {
        users.checkUserNotFound(login);
        User deleteUser = users.get(login).get();
        users.delete(deleteUser);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
