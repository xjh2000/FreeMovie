package org.xjh.movie.server.service;

import org.springframework.stereotype.Component;
import org.xjh.movie.server.mapper.UserMapper;
import org.xjh.movie.server.model.User;

import java.util.List;

@Component
public class UserService {
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public List<User> getAllUsers() {
        return userMapper.selectList(null);
    }
}
