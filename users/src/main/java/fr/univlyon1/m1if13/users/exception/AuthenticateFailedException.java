package fr.univlyon1.m1if13.users.exception;

import org.springframework.http.HttpStatus;

public class AuthenticateFailedException extends Exception {
    String message;
    HttpStatus codeStatus;

    public AuthenticateFailedException() {
        super();
        this.message = "User is not authenticated";
        this.codeStatus = HttpStatus.UNAUTHORIZED;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getCodeStatus() {
        return codeStatus;
    }
}
