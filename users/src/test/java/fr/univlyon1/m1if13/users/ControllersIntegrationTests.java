package fr.univlyon1.m1if13.users;

import org.junit.Assert;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {UsersApplication.class})
@WebAppConfiguration
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ControllersIntegrationTests {

    private final String loginTest = "test";
    private final String passwordTest = "test";
    private final String newLogin = "toto";
    private final String newPassword = "toto";
    private final String usersBeanJSON_user_created = "[" + "\"test\"," + "\"Michoco\"," + "\"Paul\"," + "\"roger\"" + "]";
    private final String usersBeanJSON_user_created_2 = "[" + "\"player5\"," + "\"player1\"," + "\"test\"," + "\"player2\"," + "\"player3\"," + "\"player4\"," + "\"roger\"," + "\"Paul\"," + "\"michel\"" + "]";
    private final String usersBeanJSON_user_created_3 = "[" + "\"player5\"," + "\"toto\"," + "\"player1\"," + "\"test\"," + "\"player2\"," + "\"player3\"," + "\"player4\"," + "\"roger\"," + "\"Paul\"," + "\"michel\"" + "]";
    private final String initUsersBeanJSON = "[" + "\"test\"," + "\"Michoco\"," + "\"Paul\"" + "]";
    private final String authenticationHeader = "Authorization";
    private final String originHeaderValue = "http://localhost";
    @Autowired
    private WebApplicationContext webApplicationContext;
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void shouldVerifyBean() {
        ServletContext servletContext = webApplicationContext.getServletContext();

        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertNotNull(webApplicationContext.getBean("users"));
    }

    /**
     * Récupérer le token généré lorsqu'un utilisateur se connecte.
     *
     * @param login    Le login de l'utilisateur.
     * @param password Le mot de passe de l'utilisateur.
     * @return le token dans le header "Authorization".
     * @throws Exception
     */
    public String getToken(String login, String password) throws Exception {
        MvcResult result = this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + login + "," + "\"password\":" + password + "}"))

                .andDo(print()).andExpect(status().isNoContent()).andReturn();
        return result.getResponse().getHeader(authenticationHeader);
    }

    /**
     * Affiche tous les utilisateurs en JSON avec un code 200.
     *
     * @throws Exception
     */
    @Test
    @Order(1)
    public void shouldReturnJSONAllUsers200() throws Exception {
        this.mockMvc.perform(get("/users").accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(usersBeanJSON_user_created_2));
    }

    /**
     * Crée un utilisateur avec succès. Code 201.
     *
     * @throws Exception
     */
    @Test
    @Order(2)
    public void shouldCreateJSONUser201() throws Exception {
        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content("{\"login\":" + newLogin + "," + "\"password\":" + passwordTest + "}")).andDo(print()).andExpect(status().isCreated()).andExpect(header().string("Location", "/users/" + newLogin));
    }

    /**
     * Se connecte avec l'utilisateur précedemment créé avec succès. Code 204.
     *
     * @throws Exception
     */
    @Test
    @Order(3)
    public void shouldLogUser() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + newLogin + "," + "\"password\":" + passwordTest + "}")).andDo(print()).andExpect(status().isNoContent()).andExpect(header().string("Location", "/users/" + newLogin)).andExpect(header().string(authenticationHeader, getToken(newLogin, passwordTest)));
    }

    /**
     * Indique que l'utilisateur connecté est bien authentifié. Code 204.
     *
     * @throws Exception
     */
    @Test
    @Order(4)
    public void shouldReturnAuthenticate204() throws Exception {
        this.mockMvc.perform(get("/authenticate").param("token", getToken(newLogin, passwordTest)).param("origin", originHeaderValue)).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * Affiche l'utilisateur précedemment créé. Code 200.
     *
     * @throws Exception
     */
    @Test
    @Order(5)
    public void shouldReturnJSONUser200() throws Exception {
        this.mockMvc.perform(get("/users/" + loginTest).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json("{" + "\"login\":" + loginTest + "," + "\"connected\":false" + "}")).andExpect(status().isOk());
    }

    /**
     * Affiche une nouvelle fois tous les utilisateurs en JSON, avec l'utilisateur
     * précedemment créé. Code 200.
     *
     * @throws Exception
     */
    @Test
    @Order(6)
    public void shouldReturnJSONAllUsers200_2() throws Exception {
        this.mockMvc.perform(get("/users").accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json(usersBeanJSON_user_created_3));
    }

    /**
     * Déconnecte l'utilisateur connecté.
     *
     * @throws Exception
     */
    @Test
    @Order(7)
    public void shouldLogoutUser204() throws Exception {
        this.mockMvc.perform(delete("/logout").header(authenticationHeader, getToken(newLogin, passwordTest)).header("Origin", originHeaderValue)).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * Supprime l'utilisateur précedemment créé. Code 204.
     *
     * @throws Exception
     */
    @Test
    @Order(8)
    public void shouldDeleteUser204() throws Exception {
        this.mockMvc.perform(delete("/users/" + newLogin)).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * N'affiche pas l'utilisateur précedemment supprimé, il n'existe plus. Code 404.
     *
     * @throws Exception
     */
    @Test
    @Order(9)
    public void shouldReturnJSONUser404() throws Exception {
        this.mockMvc.perform(get("/users/" + newLogin).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Impossibilité de se connecté avec l'utilisateur qui n'existe plus. Code 404.
     *
     * @throws Exception
     */
    @Test
    @Order(10)
    public void shouldLogJSONUser404() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + newLogin + "," + "\"password\":" + newPassword + "}")).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Met à jour le mot de passe d'un utilisateur existant. Code 204.
     *
     * @throws Exception
     */
    @Test
    @Order(11)
    public void shouldUpdateJSONUser204() throws Exception {
        this.mockMvc.perform(put("/users/" + loginTest).contentType(MediaType.APPLICATION_JSON_VALUE).content("{\"login\":" + loginTest + "," + "\"password\":" + newPassword + "," + "\"connected\":false}")).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * Se connecte avec l'ancien mot de passe de l'utilisateur mis à jour. Code 401.
     *
     * @throws Exception
     */
    @Test
    @Order(12)
    public void shouldLogJSONUser401() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + loginTest + "," + "\"password\":" + passwordTest + "}")).andDo(print()).andExpect(status().isUnauthorized());
    }
}
