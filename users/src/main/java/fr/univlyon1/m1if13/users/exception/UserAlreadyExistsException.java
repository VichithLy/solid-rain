package fr.univlyon1.m1if13.users.exception;

import org.springframework.http.HttpStatus;

public class UserAlreadyExistsException extends Throwable {
    String message;
    HttpStatus codeStatus;

    public UserAlreadyExistsException() {
        super();
        this.message = "User already exists";
        this.codeStatus = HttpStatus.CONFLICT;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public HttpStatus getCodeStatus() {
        return codeStatus;
    }
}
