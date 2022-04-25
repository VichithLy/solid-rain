package fr.univlyon1.m1if13.users.model;

import fr.univlyon1.m1if13.users.exception.UserAlreadyExistsException;
import fr.univlyon1.m1if13.users.exception.UserNotFoundException;

import java.util.*;

public class UserDao implements Dao<User> {

    private final List<User> users = new ArrayList<>();

    public UserDao() {
        users.add(new User("player1", "player1"));
        users.add(new User("player2", "player2"));
        users.add(new User("player3", "player3"));
        users.add(new User("player4", "player4"));
        users.add(new User("player5", "player5"));
    }

    @Override
    public Optional<User> get(String id) {
        for (User u : users) {
            if (u.getLogin().equals(id)) {
                return Optional.ofNullable(u);
            }
        }
        return Optional.ofNullable(null);
    }

    public void checkUserAlreadyExists(String id) throws UserAlreadyExistsException {
        if (this.get(id).isPresent()) {
            throw new UserAlreadyExistsException();
        }
    }

    public void checkUserNotFound(String id) throws UserNotFoundException {
        if (this.get(id).isEmpty()) {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Set<String> getAll() {
        Set<String> listUser = new HashSet<>();
        for (User u : users) {
            listUser.add(u.getLogin());
        }
        return listUser;
    }

    @Override
    public void save(User user) {
        users.add(user);
    }

    @Override
    public void update(User user, String[] params) {
        user.setLogin(Objects.requireNonNull(params[0], "Login cannot be null"));
        user.setPassword(Objects.requireNonNull(params[1], "Password cannot be null"));
        users.add(user);
    }

    @Override
    public void delete(User user) {
        users.remove(user);
    }
}
