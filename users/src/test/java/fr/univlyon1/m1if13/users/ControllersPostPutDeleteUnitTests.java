package fr.univlyon1.m1if13.users;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {UsersApplication.class})
@WebAppConfiguration
class ControllersPostPutDeleteUnitTests {

    private final String loginTest = "test";
    private final String passwordTest = "test";
    private final String badLoginTest = "teste";
    private final String badPasswordTest = "teste";
    private final String notExistLogin = "testouille";
    private final String createLogin1 = "roger";
    private final String createPassword1 = "roger";
    private final String createLogin2 = "michel";
    private final String createPassword2 = "michel";
    private final String updateLogin = "Paul";
    private final String updatePassword = "paul";
    private final String deleteLogin = "Michoco";
    private final String initUsersBeanXML = "<Set>" + "<item>test</item>" + "<item>Michoco</item>" + "<item>Paul</item>" + "</Set>";
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

    /**
     * Récupérer le token généré lorsqu'un utilisateur se connecte.
     *
     * @param login
     * @param password
     * @return
     * @throws Exception
     */
    public String getToken(String login, String password) throws Exception {
        MvcResult result = this.mockMvc

                .perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + login + "," + "\"password\":" + password + "}")).andDo(print()).andExpect(status().isNoContent()).andReturn();
        return result.getResponse().getHeader(authenticationHeader);
    }

    /**
     * Se connecte avec un utilisateur existant sous forme JSON. Code 204.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogUser() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + loginTest + "," + "\"password\":" + passwordTest + "}")).andDo(print()).andExpect(status().isNoContent()).andExpect(header().string("Authorization", getToken(loginTest, passwordTest)));
    }

    /**
     * Impossibilité de se connecter avec un utilisateur sous forme JSON,
     * paramètres manquants. Code 400.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogJSONUser400() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue)).andDo(print()).andExpect(status().isBadRequest());
    }

    /**
     * Impossibilité de se connecter avec un utilisateur sous forme JSON,
     * mauvais mot de passe. Code 401.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogJSONUser401() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + loginTest + "," + "\"password\":" + badPasswordTest + "}")).andDo(print()).andExpect(status().isUnauthorized());
    }

    /**
     * Impossibilité de se connecter avec un utilisateur inexistant sous forme JSON.
     * Code 404.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogJSONUser404() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + badLoginTest + "," + "\"password\":" + passwordTest + "}")).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Se connecte avec un utilisateur existant sous forme FORM URLENCODED.
     * Code 204.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogFORMURLENCODEDUser204() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).header("Origin", originHeaderValue).content("login=" + loginTest + "&password=" + passwordTest)).andDo(print()).andExpect(status().isNoContent()).andExpect(header().string(authenticationHeader, getToken(loginTest, passwordTest)));
    }

    /**
     * Impossibilité de se connecter avec un utilisateur sous forme FORM URLENCODED,
     * paramètres manquants. Code 400.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogFORMURLENCODEDUser400() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).header("Origin", originHeaderValue)).andDo(print()).andExpect(status().isBadRequest());
    }

    /**
     * Impossibilité de se connecter avec un utilisateur sous forme FORM URLENCODED,
     * mauvais mot de passe. Code 401.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogFORMURLENCODEDUser401() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).header("Origin", originHeaderValue).content("login=" + loginTest + "&password=" + badPasswordTest)).andDo(print()).andExpect(status().isUnauthorized());
    }

    /**
     * Impossibilité de se connecter avec un utilisateur inexistant
     * sous forme FORM URLENCODED. Code 404.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogFORMURLENCODEDUser404() throws Exception {
        this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).header("Origin", originHeaderValue).content("login=" + badLoginTest + "&password=" + passwordTest)).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Crée un utilisateur sous format JSON avec succès. Code 201.
     *
     * @throws Exception
     */
    @Test
    public void shouldCreateJSONUser201() throws Exception {
        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content("{\"login\":" + createLogin1 + "," + "\"password\":" + createPassword1 + "}")).andDo(print()).andExpect(status().isCreated()).andExpect(header().string("Location", "/users/" + createLogin1));
    }

    /**
     * Impossible de créer un utilisateur sous format JSON.
     * Paramètres manquants. Code 201.
     *
     * @throws Exception
     */
    @Test
    public void shouldCreateJSONUser400() throws Exception {
        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isBadRequest());
    }

    /**
     * Impossible de créer un utilisateur sous format JSON déjà existant.
     * Code 409.
     *
     * @throws Exception
     */
    @Test
    public void shouldCreateJSONUser409() throws Exception {
        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content("{" + "\"login\":" + loginTest + "," + "\"password\":" + passwordTest + "}")).andDo(print()).andExpect(status().isConflict());
    }

    /**
     * Crée un utilisateur sous format FORM URLENCODED avec succès.
     * Code 201.
     *
     * @throws Exception
     */
    @Test
    public void shouldCreateFORMURLENCODEDUser201() throws Exception {
        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).content("login=" + createLogin2 + "&password=" + createPassword2 + "&connected=false")).andDo(print()).andExpect(status().isCreated()).andExpect(header().string("Location", "/users/" + createLogin2));
    }

    /**
     * Impossible de créer un utilisateur sous format FORM URLENCODED.
     * Code 400.
     *
     * @throws Exception
     */
    @Test
    public void shouldCreateFORMURLENCODEDUser400() throws Exception {
        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE)).andDo(print()).andExpect(status().isBadRequest());
    }

    /**
     * Impossible de créer un utilisateur sous format
     * FORM URLENCODED déjà existant. Code 409.
     *
     * @throws Exception
     */
    @Test
    public void shouldCreateFORMURLENCODEDUser409() throws Exception {
        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).content("login=" + loginTest + "&password=" + passwordTest + "&connected=false")).andDo(print()).andExpect(status().isConflict());
    }

    /**
     * Met à jour le mot de passe d'un utilisateur existant sous format JSON.
     * Code 204.
     *
     * @throws Exception
     */
    @Test
    public void shouldUpdateJSONUser204() throws Exception {
        this.mockMvc.perform(put("/users/" + updateLogin).contentType(MediaType.APPLICATION_JSON_VALUE).content("{\"login\":" + updateLogin + "," + "\"password\":" + updatePassword + "," + "\"connected\":false}")).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * Impossible de mettre à jour un utilisateur inexistant sous format JSON,
     * Code 404.
     *
     * @throws Exception
     */
    @Test
    public void shouldUpdateJSONUser404() throws Exception {
        this.mockMvc.perform(put("/users/" + notExistLogin).contentType(MediaType.APPLICATION_JSON_VALUE).content("{\"login\":" + notExistLogin + "," + "\"password\":" + updateLogin + "," + "\"connected\":false}")).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Met à jour le mot de passe d'un utilisateur existant
     * sous format FORM URLENCODED.Code 204.
     *
     * @throws Exception
     */
    @Test
    public void shouldUpdateFORMURLENCODEDUser204() throws Exception {
        this.mockMvc.perform(put("/users/" + updateLogin).contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).content("login=" + loginTest + "&password=" + updateLogin + "&connected=false")).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * Impossible de mettre à jour un utilisateur inexistant
     * sous format FORM URLENCODED. Code 404.
     *
     * @throws Exception
     */
    @Test
    public void shouldUpdateFORMURLENCODEDUser404() throws Exception {
        this.mockMvc.perform(put("/users/" + notExistLogin).contentType(MediaType.APPLICATION_FORM_URLENCODED_VALUE).content("login=" + notExistLogin + "&password=" + updatePassword + "&connected=false")).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Déconnecte un utilisateur connecté. Code 204.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogoutUser204() throws Exception {
        this.mockMvc.perform(delete("/logout").header(authenticationHeader, getToken(loginTest, passwordTest)).header("Origin", originHeaderValue)).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * Impossible de déconnecté un utilisateur, paramètres erronés.
     * Code 401.
     *
     * @throws Exception
     */
    @Test
    public void shouldLogoutUser401() throws Exception {
        this.mockMvc.perform(delete("/logout").header(authenticationHeader, getToken(loginTest, passwordTest)).header("Origin", originHeaderValue).header("Origin", "test")) // 2 headers Origin
                .andDo(print()).andExpect(status().isUnauthorized());
    }

    /**
     * Supprime un utilisateur existant. Code 204.
     *
     * @throws Exception
     */
    @Test
    public void shouldDeleteUser204() throws Exception {
        this.mockMvc.perform(delete("/users/" + deleteLogin)).andDo(print()).andExpect(status().isNoContent());
    }

    /**
     * Impossible de supprimer un utilisateur inexistant. Code 404.
     *
     * @throws Exception
     */
    @Test
    public void shouldDeleteUser404() throws Exception {
        this.mockMvc.perform(delete("/users/" + notExistLogin)).andDo(print()).andExpect(status().isNotFound());
    }
}
