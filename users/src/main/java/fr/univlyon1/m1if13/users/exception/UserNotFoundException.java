package fr.univlyon1.m1if13.users.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends Exception {
    String message;
    HttpStatus codeStatus;

    public UserNotFoundException() {
        super();
        this.message = "User not found";
        this.codeStatus = HttpStatus.NOT_FOUND;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getCodeStatus() {
        return codeStatus;
    }
}
