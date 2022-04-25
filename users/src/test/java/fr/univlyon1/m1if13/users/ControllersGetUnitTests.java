package fr.univlyon1.m1if13.users;

import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {UsersApplication.class})
@WebAppConfiguration
public class ControllersGetUnitTests {

    private final String loginTest = "test";
    private final String passwordTest = "test";
    private final String loginTest2 = "Paul";
    private final String badLoginTest = "teste";
    private final String notExistLogin = "testouille";
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
        MvcResult result = this.mockMvc.perform(post("/login").contentType(MediaType.APPLICATION_JSON).header("Origin", originHeaderValue).content("{\"login\":" + login + "," + "\"password\":" + password + "}")).andDo(print()).andExpect(status().isNoContent()).andReturn();
        return result.getResponse().getHeader(authenticationHeader);
    }

    /**
     * Retourne un utilisateur sous format JSON avec un code HTTP 200.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnJSONUser200() throws Exception {
        this.mockMvc.perform(get("/users/" + loginTest).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON)).andExpect(content().json("{" + "\"login\":" + loginTest + "," + "\"connected\":false" + "}"));
    }

    /**
     * N'affiche pas d'utilisateur sous format JSON. Code d'erreur 404.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnJSONUser404() throws Exception {
        this.mockMvc.perform(get("/users/" + notExistLogin).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Affiche un utilisateur sous format XML avec un code HTTP 200.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnXMLUser200() throws Exception {
        this.mockMvc.perform(get("/users/" + loginTest).accept(MediaType.APPLICATION_XML_VALUE).header("Origin", originHeaderValue)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_XML_VALUE)).andExpect(content().xml("<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "<User>" + "<login>" + loginTest + "</login>" + "<connected>false</connected>" + "</User>"));
    }

    /**
     * N'affiche pas d'utilisateur sous format XML. Code d'erreur 404.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnXMLUser404() throws Exception {
        this.mockMvc.perform(get("/users/" + badLoginTest).accept(MediaType.APPLICATION_XML_VALUE)).andDo(print()).andExpect(status().isNotFound());
    }

    /**
     * Affiche un utilisateur dans une page HTML avec un code HTTP 200.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnHTMLUser200() throws Exception {
        this.mockMvc.perform(get("/users/" + loginTest).accept(MediaType.TEXT_HTML_VALUE)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType("text/html;charset=UTF-8"));
    }

    /**
     * Affiche tous les utilisateurs en JSON avec un code 200.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnJSONAllUsers200() throws Exception {
        this.mockMvc.perform(get("/users").accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    /**
     * Affiche tous les utilisateurs en XML avec un code 200.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnXMLAllUsers200() throws Exception {
        this.mockMvc.perform(get("/users").accept(MediaType.APPLICATION_XML_VALUE)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType(MediaType.APPLICATION_XML_VALUE));
    }

    /**
     * Affiche tous les utilisateurs dans une page HTML avec un code 200.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnHTMLAllUsers200() throws Exception {
        this.mockMvc.perform(get("/users").accept(MediaType.TEXT_HTML_VALUE)).andDo(print()).andExpect(status().isOk()).andExpect(content().contentType("text/html;charset=UTF-8"));
    }

    /**
     * Mauvais paramètres pour l'authentification.
     *
     * @throws Exception
     */
    @Test
    public void shouldReturnAuthenticate400() throws Exception {
        this.mockMvc.perform(get("/authenticate")).andDo(print()).andExpect(status().isBadRequest());
    }
}
